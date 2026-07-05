import "dotenv/config"
import { PrismaClient } from "@/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const connectionString = process.env.DATABASE_URL || "postgresql://mac@localhost:5432/iwacu_chef"
const adapter = new PrismaPg(connectionString)
const prisma = new PrismaClient({ adapter })

async function seed() {
  console.log("Seeding database...")

  // Clear existing data
  await prisma.order.deleteMany()
  await prisma.review.deleteMany()
  await prisma.menuItem.deleteMany()
  await prisma.user.deleteMany()
  await prisma.chef.deleteMany()

  // ── Chefs ──────────────────────────────────────
  const chefs = await Promise.all([
    prisma.chef.create({
      data: {
        id: "chef-1", slug: "mama-keziah", name: "Mama Keziah", title: "Traditional Rwandan home cooking with love",
        bio: "For over 20 years, Mama Keziah has been perfecting the art of Rwandan home cooking. Her kitchen is a place where tradition meets warmth, and every dish tells a story of her village in the northern province.",
        story: "Growing up in a small village near Ruhengeri, Keziah learned to cook from her grandmother, using firewood and clay pots. Today, she brings those same authentic flavours to your table, using locally sourced ingredients and time-honoured techniques.",
        photo: "https://images.unsplash.com/photo-1556911220-bffb3a9f3e9d?w=400&h=400&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop",
        location: "Kigali, Rwanda",
        cuisineType: JSON.stringify(["Rwandan", "East African"]),
        rating: 4.9, reviewCount: 8,
        deliveryAvailable: true, pickupAvailable: true,
        operatingHours: "Mon-Sat 8:00-20:00", priceRange: 2,
        joinedDate: "2023-01-15", featured: true,
        email: "mama@iwacu.rw", password: "password123",
      },
    }),
    prisma.chef.create({
      data: {
        id: "chef-2", slug: "chef-pierre", name: "Chef Pierre", title: "French-Rwandan fusion cuisine",
        bio: "A culinary artist blending French techniques with Rwandan ingredients.",
        story: "Trained in Paris and inspired by the markets of Kigali, Chef Pierre creates dishes that bridge two worlds.",
        photo: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop",
        location: "Kicukiro, Kigali",
        cuisineType: JSON.stringify(["French", "Fusion"]),
        rating: 4.7, reviewCount: 2,
        deliveryAvailable: true, pickupAvailable: false,
        operatingHours: "Tue-Sun 10:00-22:00", priceRange: 3,
        joinedDate: "2023-03-01", featured: true,
        email: "pierre@iwacu.rw", password: "password123",
      },
    }),
    prisma.chef.create({
      data: {
        id: "chef-3", slug: "amina-spices", name: "Amina Spices", title: "Exquisite Swahili coastal cuisine",
        bio: "Bringing the flavours of Zanzibar and the Swahili coast to Kigali.",
        story: "Amina's grandmother ran a spice stall in Stone Town. Today, she uses those same spice blends in her kitchen.",
        photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=600&fit=crop",
        location: "Nyamirambo, Kigali",
        cuisineType: JSON.stringify(["Swahili", "Coastal"]),
        rating: 4.8, reviewCount: 3,
        deliveryAvailable: true, pickupAvailable: true,
        operatingHours: "Mon-Sun 9:00-21:00", priceRange: 2,
        joinedDate: "2023-06-01", featured: true,
        email: "amina@iwacu.rw", password: "password123",
      },
    }),
    prisma.chef.create({
      data: {
        id: "chef-4", slug: "chef-emmanuel", name: "Chef Emmanuel", title: "Modern African fine dining",
        bio: "Pushing boundaries with contemporary African cuisine.",
        story: "After working in top restaurants in Cape Town and Nairobi, Emmanuel returned home to redefine what African cuisine can be.",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&h=600&fit=crop",
        location: "Kimihurura, Kigali",
        cuisineType: JSON.stringify(["Contemporary African", "Fine Dining"]),
        rating: 4.5, reviewCount: 2,
        deliveryAvailable: false, pickupAvailable: true,
        operatingHours: "Wed-Sun 18:00-23:00", priceRange: 3,
        joinedDate: "2024-01-01", featured: false,
        email: "emmanuel@iwacu.rw", password: "password123",
      },
    }),
    prisma.chef.create({
      data: {
        id: "chef-5", slug: "mama-grace", name: "Mama Grace", title: "Hearty Ugandan home meals",
        bio: "Warming hearts with traditional Ugandan dishes passed down through generations.",
        story: "Mama Grace believes food is love. Her portions are generous, her flavours are bold.",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=1200&h=600&fit=crop",
        location: "Remera, Kigali",
        cuisineType: JSON.stringify(["Ugandan", "East African"]),
        rating: 4.6, reviewCount: 1,
        deliveryAvailable: true, pickupAvailable: true,
        operatingHours: "Mon-Fri 7:00-19:00", priceRange: 1,
        joinedDate: "2024-02-15", featured: false,
        email: "grace@iwacu.rw", password: "password123",
      },
    }),
    prisma.chef.create({
      data: {
        id: "chef-6", slug: "chef-marc", name: "Chef Marc", title: "Italian cuisine with a Rwandan soul",
        bio: "Handmade pasta and wood-fired pizza using local Rwandan produce.",
        story: "Marc fell in love with Italian cooking while travelling through Tuscany. He brought those skills back to Kigali.",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=1200&h=600&fit=crop",
        location: "Kacyiru, Kigali",
        cuisineType: JSON.stringify(["Italian", "Mediterranean"]),
        rating: 4.4, reviewCount: 1,
        deliveryAvailable: true, pickupAvailable: false,
        operatingHours: "Tue-Sun 11:00-22:00", priceRange: 2,
        joinedDate: "2024-03-01", featured: false,
        email: "marc@iwacu.rw", password: "password123",
      },
    }),
  ])
  console.log(`Inserted ${chefs.length} chefs`)

  // ── Menu Items ────────────────────────────────
  const mealImages = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop",
  ]

  const itemsData = [
    // Mama Keziah — 27 items
    { id: "item-1", chefId: "chef-1", name: "Ugali & Sukuma Wiki", description: "Maize meal served with sautéed collard greens and a side of tomato relish.", price: 3000, category: "Breakfast", dietary: JSON.stringify(["Vegetarian"]), serves: 1, prepTime: "15 min" },
    { id: "item-2", chefId: "chef-1", name: "Millet Porridge", description: "Warm and creamy millet porridge sweetened with honey, topped with fresh banana and ground peanuts.", price: 2000, category: "Breakfast", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "10 min" },
    { id: "item-3", chefId: "chef-1", name: "Sambusa", description: "Crispy fried pastry filled with spiced beef, onions, and fresh herbs.", price: 500, category: "Appetizers", dietary: JSON.stringify([]), serves: 1, prepTime: "20 min" },
    { id: "item-4", chefId: "chef-1", name: "Isombe with Sweet Potato", description: "Cassava leaves cooked in peanut sauce, served with steamed sweet potatoes.", price: 5000, category: "Soups & Stews", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "30 min" },
    { id: "item-5", chefId: "chef-1", name: "Akabenz", description: "Crispy fried pork belly marinated in garlic, ginger, and local spices.", price: 7000, category: "Mains", dietary: JSON.stringify([]), serves: 1, prepTime: "25 min" },
    { id: "item-6", chefId: "chef-1", name: "Brochettes (Beef)", description: "Grilled beef skewers with a smoky spice rub, served with grilled plantains.", price: 6000, category: "Grills", dietary: JSON.stringify(["Gluten-Free"]), serves: 1, prepTime: "20 min" },
    { id: "item-7", chefId: "chef-1", name: "Brochettes (Chicken)", description: "Grilled chicken skewers marinated in lemon, garlic, and African herbs.", price: 5500, category: "Grills", dietary: JSON.stringify(["Gluten-Free"]), serves: 1, prepTime: "20 min" },
    { id: "item-8", chefId: "chef-1", name: "Dodo & Groundnuts", description: "Sautéed amaranth leaves with roasted groundnuts and a hint of chilli.", price: 3000, category: "Sides", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "10 min" },
    { id: "item-9", chefId: "chef-1", name: "Fresh Passion Juice", description: "Freshly squeezed passion fruit juice, lightly sweetened.", price: 1500, category: "Drinks", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "5 min" },
    { id: "item-10", chefId: "chef-1", name: "Fruit Sushi", description: "Japanese sushi meets tropical fruit – fresh mango, papaya, and coconut wrapped in sweet rice.", price: 3500, category: "Desserts", dietary: JSON.stringify(["Vegan"]), serves: 1, prepTime: "15 min" },
    { id: "item-11", chefId: "chef-1", name: "Mandazi", description: "East African coconut doughnuts, lightly sweetened and dusted with cardamom sugar.", price: 1000, category: "Breakfast", dietary: JSON.stringify(["Vegetarian"]), serves: 1, prepTime: "20 min" },
    { id: "item-12", chefId: "chef-1", name: "Chapati", description: "Layered whole-wheat flatbread, golden and flaky.", price: 500, category: "Sides", dietary: JSON.stringify(["Vegetarian"]), serves: 1, prepTime: "15 min" },
    { id: "item-13", chefId: "chef-1", name: "Pili Pili Shrimp Skewers", description: "Succulent shrimp brushed with spicy pili pili sauce, grilled to perfection.", price: 8000, category: "Appetizers", dietary: JSON.stringify(["Gluten-Free"]), serves: 1, prepTime: "15 min" },
    { id: "item-14", chefId: "chef-1", name: "Groundnut Soup", description: "Rich and creamy peanut soup with sweet potato and a hint of ginger.", price: 3500, category: "Soups & Stews", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "25 min" },
    { id: "item-15", chefId: "chef-1", name: "Sombe & Beans", description: "Tender cassava leaves simmered in coconut milk, served with red beans.", price: 4500, category: "Mains", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "30 min" },
    { id: "item-16", chefId: "chef-1", name: "Spiced Tilapia", description: "Whole tilapia stuffed with lemongrass, ginger, and chilli, then grilled.", price: 9000, category: "Grills", dietary: JSON.stringify(["Gluten-Free"]), serves: 1, prepTime: "30 min" },
    { id: "item-17", chefId: "chef-1", name: "Matoke (Steamed Plantains)", description: "Green plantains steamed in banana leaves with a touch of smoked salt.", price: 2500, category: "Sides", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "20 min" },
    { id: "item-18", chefId: "chef-1", name: "Ginger & Lemongrass Tea", description: "Soothing herbal tea made with fresh ginger, lemongrass, and a drizzle of honey.", price: 1000, category: "Drinks", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "7 min" },
    { id: "item-19", chefId: "chef-1", name: "Coconut Rice Pudding", description: "Creamy rice pudding with coconut milk, cinnamon, and caramelized banana.", price: 3000, category: "Desserts", dietary: JSON.stringify(["Vegetarian", "Gluten-Free"]), serves: 1, prepTime: "20 min" },
    { id: "item-20", chefId: "chef-1", name: "Sweet Potato & Peanut Stew", description: "Chunky sweet potato stew with peanuts, tomatoes, and a hint of chilli.", price: 4500, category: "Soups & Stews", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "25 min" },
    { id: "item-21", chefId: "chef-1", name: "Rwandan Coffee", description: "Freshly brewed single-origin Rwandan coffee from the shores of Lake Kivu.", price: 1500, category: "Drinks", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "5 min" },
    { id: "item-22", chefId: "chef-1", name: "Plantain Chips", description: "Thinly sliced green plantains fried to crispy perfection, salted with smoked salt.", price: 1500, category: "Appetizers", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "10 min" },
    { id: "item-23", chefId: "chef-1", name: "Mishkaki", description: "Tender beef skewers marinated in African spices and grilled over charcoal.", price: 5000, category: "Grills", dietary: JSON.stringify(["Gluten-Free"]), serves: 1, prepTime: "20 min" },
    { id: "item-24", chefId: "chef-1", name: "Avocado & Mango Salad", description: "Fresh avocado, mango, and cucumber salad with lime and cilantro dressing.", price: 3000, category: "Appetizers", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "10 min" },
    { id: "item-25", chefId: "chef-1", name: "Fruit Platter", description: "Assortment of fresh tropical fruits — pineapple, papaya, mango, watermelon, and passion fruit.", price: 3500, category: "Desserts", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "10 min" },
    { id: "item-26", chefId: "chef-1", name: "Grilled Maize", description: "Fire-roasted maize on the cob, brushed with seasoned butter and lime.", price: 2000, category: "Sides", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "15 min" },
    { id: "item-27", chefId: "chef-1", name: "Ibishyimbo (Sweet Banana Wine)", description: "Traditional Rwandan banana wine, mildly sweet and naturally fermented.", price: 2500, category: "Drinks", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "2 min", available: false },
    // Chef Pierre — 3 items
    { id: "item-28", chefId: "chef-2", name: "Duck Confit with Cassava Purée", description: "Classic French duck confit served with creamy cassava purée and a red wine reduction.", price: 15000, category: "Mains", dietary: JSON.stringify(["Gluten-Free"]), serves: 1, prepTime: "45 min" },
    { id: "item-29", chefId: "chef-2", name: "Tuna Tartare with Plantain Chips", description: "Fresh tuna diced and seasoned with ginger, soy, and lime, served with crispy plantain chips.", price: 12000, category: "Appetizers", dietary: JSON.stringify(["Gluten-Free"]), serves: 1, prepTime: "15 min" },
    { id: "item-30", chefId: "chef-2", name: "Crème Brûlée with Passion Fruit", description: "Silky vanilla crème brûlée topped with a layer of caramelized sugar and fresh passion fruit.", price: 8000, category: "Desserts", dietary: JSON.stringify(["Vegetarian", "Gluten-Free"]), serves: 1, prepTime: "30 min" },
    // Amina Spices — 3 items
    { id: "item-31", chefId: "chef-3", name: "Zanzibari Biryani", description: "Fragrant spiced rice layered with tender chicken, caramelized onions, and dried fruits.", price: 10000, category: "Mains", dietary: JSON.stringify([]), serves: 2, prepTime: "45 min" },
    { id: "item-32", chefId: "chef-3", name: "Octopus Curry", description: "Tender octopus simmered in a spiced coconut curry with turmeric and tamarind.", price: 12000, category: "Mains", dietary: JSON.stringify(["Gluten-Free"]), serves: 1, prepTime: "35 min" },
    { id: "item-33", chefId: "chef-3", name: "Spiced Samosas", description: "Crispy samosas filled with spiced potatoes, peas, and minced lamb.", price: 3000, category: "Appetizers", dietary: JSON.stringify([]), serves: 3, prepTime: "20 min" },
    // Chef Emmanuel — 3 items
    { id: "item-34", chefId: "chef-4", name: "Deconstructed Isombe", description: "Cassava leaves deconstructed — foam, crisp, and purée with smoked paprika oil.", price: 18000, category: "Mains", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "40 min" },
    { id: "item-35", chefId: "chef-4", name: "Trio of African Grains", description: "Sorghum, millet, and teff prepared three ways — porridge, cracker, and soufflé.", price: 14000, category: "Appetizers", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "30 min" },
    { id: "item-36", chefId: "chef-4", name: "Baobab Sorbet", description: "Refreshing baobab fruit sorbet with a hint of mint and lime.", price: 7000, category: "Desserts", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "15 min" },
    // Mama Grace — 3 items
    { id: "item-37", chefId: "chef-5", name: "Luwombo", description: "Steamed groundnut stew with chicken and vegetables, cooked in banana leaves.", price: 8000, category: "Mains", dietary: JSON.stringify(["Gluten-Free"]), serves: 1, prepTime: "40 min" },
    { id: "item-38", chefId: "chef-5", name: "Rolex", description: "Ugandan-style rolled chapati filled with spiced scrambled eggs and shredded cabbage.", price: 4000, category: "Breakfast", dietary: JSON.stringify(["Vegetarian"]), serves: 1, prepTime: "15 min" },
    { id: "item-39", chefId: "chef-5", name: "Matooke with Groundnut Sauce", description: "Steamed green bananas served with a rich groundnut sauce and beef.", price: 6000, category: "Mains", dietary: JSON.stringify(["Gluten-Free"]), serves: 1, prepTime: "35 min" },
    // Chef Marc — 6 items
    { id: "item-40", chefId: "chef-6", name: "Handmade Tagliatelle with Mushroom Ragù", description: "Fresh egg pasta with slow-cooked mushroom ragù, thyme, and aged Parmesan.", price: 12000, category: "Mains", dietary: JSON.stringify(["Vegetarian"]), serves: 1, prepTime: "30 min" },
    { id: "item-41", chefId: "chef-6", name: "Margherita Pizza (Wood-Fired)", description: "Classic Neapolitan pizza with San Marzano tomatoes, mozzarella, and basil.", price: 10000, category: "Mains", dietary: JSON.stringify(["Vegetarian"]), serves: 1, prepTime: "20 min" },
    { id: "item-42", chefId: "chef-6", name: "Bruschetta with Rwandan Cherry Tomatoes", description: "Toasted sourdough with local cherry tomatoes, basil, and olive oil.", price: 5000, category: "Appetizers", dietary: JSON.stringify(["Vegan"]), serves: 1, prepTime: "10 min" },
    { id: "item-43", chefId: "chef-6", name: "Panna Cotta with Coffee Caramel", description: "Silky Italian panna cotta topped with Rwandan coffee caramel.", price: 7000, category: "Desserts", dietary: JSON.stringify(["Vegetarian", "Gluten-Free"]), serves: 1, prepTime: "20 min" },
    { id: "item-44", chefId: "chef-6", name: "Aperol Spritz", description: "Classic Italian aperitif with Aperol, prosecco, and soda.", price: 5000, category: "Drinks", dietary: JSON.stringify(["Vegan", "Gluten-Free"]), serves: 1, prepTime: "3 min" },
    { id: "item-45", chefId: "chef-6", name: "Tiramisu", description: "Classic Italian tiramisu with mascarpone, espresso, and cocoa.", price: 8000, category: "Desserts", dietary: JSON.stringify(["Vegetarian"]), serves: 1, prepTime: "25 min" },
  ]

  const menuItems = await Promise.all(
    itemsData.map((item, i) =>
      prisma.menuItem.create({
        data: {
          ...item,
          image: mealImages[i % mealImages.length],
          available: item.available ?? true,
        },
      })
    )
  )
  console.log(`Inserted ${menuItems.length} menu items`)

  // ── Reviews ──────────────────────────────────
  const customerPhotos = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  ]

  const reviewsData = [
    { id: "rev-1", chefId: "chef-1", customerName: "Alice M.", customerPhoto: customerPhotos[0], rating: 5, text: "Mama Keziah's isombe is the real deal — just like my grandmother used to make.", date: "2024-12-15" },
    { id: "rev-2", chefId: "chef-1", customerName: "Jean-Pierre K.", customerPhoto: customerPhotos[1], rating: 5, text: "Best brochettes in Kigali! The meat is perfectly seasoned and grilled.", date: "2025-01-10" },
    { id: "rev-3", chefId: "chef-1", customerName: "Sarah N.", customerPhoto: customerPhotos[2], rating: 4, text: "Love the fresh passion juice and the mandazi. Perfect afternoon treat.", date: "2025-02-20" },
    { id: "rev-4", chefId: "chef-1", customerName: "David O.", customerPhoto: customerPhotos[3], rating: 5, text: "The groundnut soup is heavenly! So rich and flavourful.", date: "2025-03-05" },
    { id: "rev-5", chefId: "chef-1", customerName: "Grace U.", customerPhoto: customerPhotos[0], rating: 5, text: "Ordered the full family meal for my mother's birthday. Everyone was impressed!", date: "2025-03-18" },
    { id: "rev-6", chefId: "chef-1", customerName: "Patrick B.", customerPhoto: customerPhotos[1], rating: 5, text: "The tilapia is exceptional — perfectly spiced and grilled.", date: "2025-04-02" },
    { id: "rev-7", chefId: "chef-1", customerName: "Mutesi R.", customerPhoto: customerPhotos[2], rating: 4, text: "Great traditional Rwandan food. The sombe with beans reminds me of home.", date: "2025-04-15" },
    { id: "rev-8", chefId: "chef-1", customerName: "Kevin D.", customerPhoto: customerPhotos[3], rating: 5, text: "The fruit sushi is unexpectedly amazing!", date: "2025-05-01" },
    { id: "rev-9", chefId: "chef-2", customerName: "Marie-Louise B.", customerPhoto: customerPhotos[0], rating: 5, text: "Chef Pierre's duck confit is out of this world.", date: "2025-02-14" },
    { id: "rev-10", chefId: "chef-2", customerName: "Thomas R.", customerPhoto: customerPhotos[1], rating: 4, text: "The tuna tartare was beautifully presented.", date: "2025-03-22" },
    { id: "rev-11", chefId: "chef-3", customerName: "Fatima S.", customerPhoto: customerPhotos[2], rating: 5, text: "Amina's biryani is the best I've had outside of Zanzibar.", date: "2025-01-30" },
    { id: "rev-12", chefId: "chef-3", customerName: "Hassan J.", customerPhoto: customerPhotos[3], rating: 5, text: "The octopus curry is incredible.", date: "2025-04-05" },
    { id: "rev-13", chefId: "chef-3", customerName: "Zahara K.", customerPhoto: customerPhotos[0], rating: 4, text: "Samosas were crispy and flavourful.", date: "2025-04-12" },
    { id: "rev-14", chefId: "chef-4", customerName: "Claude M.", customerPhoto: customerPhotos[1], rating: 5, text: "Emmanuel's deconstructed isombe is a work of art.", date: "2025-02-28" },
    { id: "rev-15", chefId: "chef-4", customerName: "Anita W.", customerPhoto: customerPhotos[2], rating: 4, text: "The trio of grains was innovative and delicious.", date: "2025-04-20" },
    { id: "rev-16", chefId: "chef-5", customerName: "Joseph K.", customerPhoto: customerPhotos[3], rating: 5, text: "Mama Grace's luwombo is pure comfort.", date: "2025-03-10" },
    { id: "rev-17", chefId: "chef-6", customerName: "Sophie L.", customerPhoto: customerPhotos[0], rating: 5, text: "Chef Marc's tagliatelle is as good as anything I've had in Rome.", date: "2025-04-25" },
  ]

  const reviews = await Promise.all(
    reviewsData.map((r) => prisma.review.create({ data: r }))
  )
  console.log(`Inserted ${reviews.length} reviews`)

  // ── Users ─────────────────────────────────────
  const usersData = [
    { id: "user-1", name: "Mama Keziah", email: "mama@iwacu.rw", password: "password123", role: "chef", chefId: "chef-1" },
    { id: "user-2", name: "Alice Mutesi", email: "alice@example.com", password: "password123", role: "customer", chefId: null },
    { id: "user-3", name: "Jean-Pierre Kagame", email: "jp@example.com", password: "password123", role: "customer", chefId: null },
    { id: "user-4", name: "Sarah Niyonzima", email: "sarah@example.com", password: "password123", role: "customer", chefId: null },
    { id: "user-5", name: "Chef Pierre", email: "pierre@iwacu.rw", password: "password123", role: "chef", chefId: "chef-2" },
  ]

  const users = await Promise.all(
    usersData.map((u) => prisma.user.create({ data: u }))
  )
  console.log(`Inserted ${users.length} users`)

  // ── Orders ────────────────────────────────────
  const ordersData = [
    {
      id: "order-1", customerId: "user-2", chefId: "chef-1",
      items: JSON.stringify([{ menuItemId: "item-1", name: "Ugali & Sukuma Wiki", quantity: 2, price: 3000 }, { menuItemId: "item-9", name: "Fresh Passion Juice", quantity: 2, price: 1500 }]),
      status: "completed", total: 9000, note: "Extra sukuma wiki please!", pickupTime: "12:30", createdAt: new Date("2025-06-10T11:00:00Z"),
    },
    {
      id: "order-2", customerId: "user-3", chefId: "chef-1",
      items: JSON.stringify([{ menuItemId: "item-5", name: "Akabenz", quantity: 1, price: 7000 }, { menuItemId: "item-12", name: "Chapati", quantity: 2, price: 500 }]),
      status: "preparing", total: 8000, note: "", pickupTime: "13:00", createdAt: new Date("2025-06-15T12:00:00Z"),
    },
    {
      id: "order-3", customerId: "user-4", chefId: "chef-2",
      items: JSON.stringify([{ menuItemId: "item-28", name: "Duck Confit with Cassava Purée", quantity: 1, price: 15000 }, { menuItemId: "item-30", name: "Crème Brûlée with Passion Fruit", quantity: 2, price: 8000 }]),
      status: "pending", total: 31000, note: "Celebrating anniversary!", pickupTime: "19:00", createdAt: new Date("2025-06-20T18:00:00Z"),
    },
  ]

  const orders = await Promise.all(
    ordersData.map((o) => prisma.order.create({ data: o }))
  )
  console.log(`Inserted ${orders.length} orders`)

  console.log("Seed complete!")
}

seed()
  .catch((e) => {
    console.error("Seed failed:", e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
