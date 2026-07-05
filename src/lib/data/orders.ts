import type { Order } from "@/types"

export const orders: Order[] = [
  {
    id: "order-001",
    customerId: "customer-1",
    chefId: "chef-1",
    items: [
      { menuItemId: "item-1", name: "Ugali & Isombe", quantity: 2, price: 3500 },
      { menuItemId: "item-4", name: "Fresh Passion Juice", quantity: 2, price: 1500 },
    ],
    status: "completed",
    total: 10000,
    createdAt: "2025-07-01T12:00:00Z",
    pickupTime: "12:30",
    note: "",
  },
  {
    id: "order-002",
    customerId: "customer-1",
    chefId: "chef-3",
    items: [
      { menuItemId: "item-9", name: "Nyama Choma Plate", quantity: 1, price: 5000 },
      { menuItemId: "item-11", name: "Mandazi (x3)", quantity: 2, price: 2000 },
    ],
    status: "preparing",
    total: 9000,
    createdAt: "2025-07-04T10:00:00Z",
    pickupTime: "10:45",
    note: "Extra kachumbari please",
  },
  {
    id: "order-003",
    customerId: "customer-1",
    chefId: "chef-2",
    items: [
      { menuItemId: "item-5", name: "Grilled Tilapia with Citrus Salsa", quantity: 1, price: 8500 },
    ],
    status: "confirmed",
    total: 8500,
    createdAt: "2025-07-05T08:00:00Z",
    pickupTime: "12:00",
    note: "",
  },
]
