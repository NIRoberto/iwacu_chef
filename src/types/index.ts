export interface Chef {
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

export interface EventTypeInfo {
  id: string
  name: string
  slug: string
  description: string
  icon: string
}

export interface MenuItem {
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

export interface Review {
  id: string
  chefId: string
  customerName: string
  customerPhoto: string
  rating: number
  text: string
  date: string
}

export interface Order {
  id: string
  customerId: string
  chefId: string
  items: OrderItem[]
  status: OrderStatus
  total: number
  createdAt: string
  pickupTime: string
  note: string
}

export interface OrderItem {
  menuItemId: string
  name: string
  quantity: number
  price: number
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "completed"
  | "declined"

export interface CartItem {
  menuItem: MenuItem
  quantity: number
}

export interface Booking {
  id: string
  chefId: string
  customerId: string
  eventTypeId: string
  eventType?: EventTypeInfo
  date: string
  guestCount: number
  menuPlan: string[]
  status: BookingStatus
  total: number
  note: string
  createdAt: string
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
