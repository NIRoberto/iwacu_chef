import "server-only"
import prisma from "./prisma"

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
}): ChefRecord {
  return {
    ...chef,
    cuisineType: JSON.parse(chef.cuisineType),
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
  const chefs = await prisma.chef.findMany({ orderBy: [{ featured: "desc" }, { rating: "desc" }] })
  return chefs.map(parseChef)
}

export async function getChefBySlug(slug: string): Promise<ChefRecord | null> {
  const chef = await prisma.chef.findUnique({ where: { slug } })
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
  return prisma.user.findFirst({ where: { email, password }, select: { id: true, name: true, email: true, role: true, chefId: true } })
}

export async function createUser(name: string, email: string, password: string): Promise<UserRecord> {
  const id = `user-${Date.now()}`
  return prisma.user.create({
    data: { id, name, email, password, role: "customer" },
    select: { id: true, name: true, email: true, role: true, chefId: true },
  })
}
