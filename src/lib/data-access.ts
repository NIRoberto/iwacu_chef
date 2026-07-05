import "server-only"
import prisma from "./prisma"
import type { EventTypeInfo } from "@/types"

export interface ChefRecord {
  id: string
  slug: string
  name: string
  title: string
  bio: string
  story: string
  photo: string
  coverImage: string
  location: string
  cuisineType: string[]
  eventTypes?: EventTypeInfo[]
  rating: number
  reviewCount: number
  deliveryAvailable: boolean
  pickupAvailable: boolean
  operatingHours: string
  priceRange: number
  joinedDate: string
  featured: boolean
}

export interface MenuItemRecord {
  id: string
  chefId: string
  name: string
  description: string
  price: number
  image: string
  category: string
  available: boolean
  dietary: string[]
  serves: number
  prepTime: string
}

export interface ReviewRecord {
  id: string
  chefId: string
  customerName: string
  customerPhoto: string
  rating: number
  text: string
  date: string
}

export interface OrderRecord {
  id: string
  customerId: string
  chefId: string
  items: string
  status: string
  total: number
  note: string
  pickupTime: string
  createdAt: Date
}

export interface UserRecord {
  id: string
  name: string
  email: string
  role: string
  chefId: string | null
}

function parseChef(chef: {
  id: string; slug: string; name: string; title: string; bio: string; story: string;
  photo: string; coverImage: string; location: string; cuisineType: string;
  rating: number; reviewCount: number; deliveryAvailable: boolean; pickupAvailable: boolean;
  operatingHours: string; priceRange: number; joinedDate: string; featured: boolean;
  eventTypes?: { eventType: { id: string; name: string; slug: string; description: string; icon: string } }[];
}): ChefRecord {
  return {
    ...chef,
    cuisineType: JSON.parse(chef.cuisineType),
    eventTypes: chef.eventTypes?.map((ct) => ct.eventType),
  }
}

function parseMenuItem(item: {
  id: string; chefId: string; name: string; description: string; price: number;
  image: string; category: string; available: boolean; dietary: string;
  serves: number; prepTime: string;
}): MenuItemRecord {
  return {
    ...item,
    dietary: JSON.parse(item.dietary),
  }
}

export async function getAllChefs(): Promise<ChefRecord[]> {
  const chefs = await prisma.chef.findMany({
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
    include: { eventTypes: { include: { eventType: true } } },
  })
  return chefs.map(parseChef)
}

export async function getChefBySlug(slug: string): Promise<ChefRecord | null> {
  const chef = await prisma.chef.findUnique({
    where: { slug },
    include: { eventTypes: { include: { eventType: true } } },
  })
  return chef ? parseChef(chef) : null
}

export async function getMenuByChefId(chefId: string): Promise<MenuItemRecord[]> {
  const items = await prisma.menuItem.findMany({ where: { chefId }, orderBy: [{ category: "asc" }, { name: "asc" }] })
  return items.map(parseMenuItem)
}

export async function getReviewsByChefId(chefId: string): Promise<ReviewRecord[]> {
  return prisma.review.findMany({ where: { chefId }, orderBy: { createdAt: "desc" } })
}

export async function getOrdersByChefId(chefId: string): Promise<OrderRecord[]> {
  return prisma.order.findMany({ where: { chefId }, orderBy: { createdAt: "desc" } })
}

export async function getOrdersByCustomerId(customerId: string): Promise<OrderRecord[]> {
  return prisma.order.findMany({ where: { customerId }, orderBy: { createdAt: "desc" } })
}

export async function getUserByEmailAndPassword(email: string, password: string): Promise<UserRecord | null> {
  return prisma.user.findFirst({
    where: { email, password },
    select: { id: true, name: true, email: true, role: true, chefId: true },
  })
}

export async function createUser(name: string, email: string, password: string): Promise<UserRecord> {
  const id = `user-${Date.now()}`
  return prisma.user.create({
    data: { id, name, email, password, role: "customer" },
    select: { id: true, name: true, email: true, role: true, chefId: true },
  })
}

export async function getEventTypes(): Promise<EventTypeInfo[]> {
  return prisma.eventType.findMany({ orderBy: { name: "asc" } })
}

export async function getBookingsByCustomerId(customerId: string) {
  return prisma.booking.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" },
    include: { eventType: true },
  })
}

export async function getBookingsByChefId(chefId: string) {
  return prisma.booking.findMany({
    where: { chefId },
    orderBy: { createdAt: "desc" },
    include: { eventType: true },
  })
}

export async function getWeeklyPlansByChefId(chefId: string) {
  return prisma.weeklyPlan.findMany({ where: { chefId }, orderBy: { dayOfWeek: "asc" } })
}

export async function upsertWeeklyPlan(data: {
  chefId: string
  dayOfWeek: number
  items: string[]
}) {
  const existing = await prisma.weeklyPlan.findUnique({
    where: { chefId_dayOfWeek: { chefId: data.chefId, dayOfWeek: data.dayOfWeek } },
  })
  if (existing) {
    return prisma.weeklyPlan.update({
      where: { id: existing.id },
      data: { items: JSON.stringify(data.items) },
    })
  }
  return prisma.weeklyPlan.create({
    data: {
      id: `plan-${data.chefId}-${data.dayOfWeek}-${Date.now()}`,
      chefId: data.chefId,
      dayOfWeek: data.dayOfWeek,
      items: JSON.stringify(data.items),
    },
  })
}

export async function createBooking(data: {
  chefId: string
  customerId: string
  eventTypeId: string
  date: Date
  guestCount: number
  menuPlan: string[]
  note?: string
  total: number
}) {
  const id = `booking-${Date.now()}`
  return prisma.booking.create({
    data: {
      id,
      chefId: data.chefId,
      customerId: data.customerId,
      eventTypeId: data.eventTypeId,
      date: data.date,
      guestCount: data.guestCount,
      menuPlan: JSON.stringify(data.menuPlan),
      note: data.note || "",
      status: "pending",
      total: data.total,
    },
    include: { eventType: true },
  })
}
