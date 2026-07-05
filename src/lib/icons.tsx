import {
  ChefHat,
  UtensilsCrossed,
  Building2,
  Cake,
  Users,
  MapPin,
  Clock,
  Truck,
  DollarSign,
  PartyPopper,
  Heart,
} from "lucide-react"
import type { ComponentType, SVGProps } from "react"

export const EVENT_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Wedding: Heart,
  "Private Dinner": UtensilsCrossed,
  "Corporate Event": Building2,
  Birthday: Cake,
  "Family Gathering": Users,
}

export {
  ChefHat,
  UtensilsCrossed,
  Building2,
  Cake,
  Users,
  MapPin,
  Clock,
  Truck,
  DollarSign,
  PartyPopper,
}
