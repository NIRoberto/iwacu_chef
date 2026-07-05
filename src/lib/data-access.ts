import { getDb, initDb } from "./db"

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
  priceRange: 1 | 2 | 3
  joinedDate: string
  featured: boolean
  email: string
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
  items: { menuItemId: string; name: string; quantity: number; price: number }[]
  status: string
  total: number
  note: string
  pickupTime: string
  createdAt: string
}

export interface UserRecord {
  id: string
  name: string
  email: string
  role: string
  chefId: string | null
}

export function getAllChefs(): ChefRecord[] {
  initDb()
  const db = getDb()
  const rows = db.prepare("SELECT * FROM chefs ORDER BY featured DESC, rating DESC").all() as Record<string, unknown>[]
  return rows.map(parseChef)
}

export function getChefBySlug(slug: string): ChefRecord | null {
  initDb()
  const db = getDb()
  const row = db.prepare("SELECT * FROM chefs WHERE slug = ?").get(slug) as Record<string, unknown> | undefined
  return row ? parseChef(row) : null
}

export function getMenuByChefId(chefId: string): MenuItemRecord[] {
  initDb()
  const db = getDb()
  const rows = db.prepare("SELECT * FROM menu_items WHERE chefId = ? ORDER BY category, name").all(chefId) as Record<string, unknown>[]
  return rows.map(parseMenuItem)
}

export function getReviewsByChefId(chefId: string): ReviewRecord[] {
  initDb()
  const db = getDb()
  const rows = db.prepare("SELECT * FROM reviews WHERE chefId = ? ORDER BY date DESC").all(chefId) as Record<string, unknown>[]
  return rows.map(parseReview)
}

export function getOrdersByChefId(chefId: string): OrderRecord[] {
  initDb()
  const db = getDb()
  const rows = db.prepare("SELECT * FROM orders WHERE chefId = ? ORDER BY createdAt DESC").all(chefId) as Record<string, unknown>[]
  return rows.map(parseOrder)
}

export function getOrdersByCustomerId(customerId: string): OrderRecord[] {
  initDb()
  const db = getDb()
  const rows = db.prepare("SELECT * FROM orders WHERE customerId = ? ORDER BY createdAt DESC").all(customerId) as Record<string, unknown>[]
  return rows.map(parseOrder)
}

export function getUserByEmailAndPassword(email: string, password: string): UserRecord | null {
  initDb()
  const db = getDb()
  const row = db.prepare("SELECT id, name, email, role, chefId FROM users WHERE email = ? AND password = ?").get(email, password) as Record<string, unknown> | undefined
  return row ? { id: row.id as string, name: row.name as string, email: row.email as string, role: row.role as string, chefId: row.chefId as string | null } : null
}

export function createUser(name: string, email: string, password: string): UserRecord {
  initDb()
  const db = getDb()
  const id = `user-${Date.now()}`
  db.prepare("INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, 'customer')").run(id, name, email, password)
  return { id, name, email, role: "customer", chefId: null }
}

function parseChef(row: Record<string, unknown>): ChefRecord {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    title: row.title as string,
    bio: row.bio as string,
    story: row.story as string,
    photo: row.photo as string,
    coverImage: row.coverImage as string,
    location: row.location as string,
    cuisineType: JSON.parse(row.cuisineType as string),
    rating: row.rating as number,
    reviewCount: row.reviewCount as number,
    deliveryAvailable: Boolean(row.deliveryAvailable),
    pickupAvailable: Boolean(row.pickupAvailable),
    operatingHours: row.operatingHours as string,
    priceRange: row.priceRange as 1 | 2 | 3,
    joinedDate: row.joinedDate as string,
    featured: Boolean(row.featured),
    email: row.email as string,
  }
}

function parseMenuItem(row: Record<string, unknown>): MenuItemRecord {
  return {
    id: row.id as string,
    chefId: row.chefId as string,
    name: row.name as string,
    description: row.description as string,
    price: row.price as number,
    image: row.image as string,
    category: row.category as string,
    available: Boolean(row.available),
    dietary: JSON.parse(row.dietary as string),
    serves: row.serves as number,
    prepTime: row.prepTime as string,
  }
}

function parseReview(row: Record<string, unknown>): ReviewRecord {
  return {
    id: row.id as string,
    chefId: row.chefId as string,
    customerName: row.customerName as string,
    customerPhoto: row.customerPhoto as string,
    rating: row.rating as number,
    text: row.text as string,
    date: row.date as string,
  }
}

function parseOrder(row: Record<string, unknown>): OrderRecord {
  return {
    id: row.id as string,
    customerId: row.customerId as string,
    chefId: row.chefId as string,
    items: JSON.parse(row.items as string),
    status: row.status as string,
    total: row.total as number,
    note: row.note as string,
    pickupTime: row.pickupTime as string,
    createdAt: row.createdAt as string,
  }
}
