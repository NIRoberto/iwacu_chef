import path from "path"
import fs from "fs"
import Database from "better-sqlite3"

const DB_PATH = path.join(process.cwd(), "data", "iwacu.db")

// Ensure data directory exists
const dir = path.dirname(DB_PATH)
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const db = new Database(DB_PATH)
db.pragma("journal_mode = WAL")
db.pragma("foreign_keys = ON")

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS chefs (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT NOT NULL DEFAULT '',
    story TEXT NOT NULL DEFAULT '',
    photo TEXT NOT NULL DEFAULT '',
    coverImage TEXT NOT NULL DEFAULT '',
    location TEXT NOT NULL DEFAULT '',
    cuisineType TEXT NOT NULL DEFAULT '[]',
    rating REAL NOT NULL DEFAULT 0,
    reviewCount INTEGER NOT NULL DEFAULT 0,
    deliveryAvailable INTEGER NOT NULL DEFAULT 1,
    pickupAvailable INTEGER NOT NULL DEFAULT 1,
    operatingHours TEXT NOT NULL DEFAULT '',
    priceRange INTEGER NOT NULL DEFAULT 2,
    joinedDate TEXT NOT NULL DEFAULT '',
    featured INTEGER NOT NULL DEFAULT 0,
    email TEXT NOT NULL DEFAULT '',
    password TEXT NOT NULL DEFAULT '',
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS menu_items (
    id TEXT PRIMARY KEY,
    chefId TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    price REAL NOT NULL DEFAULT 0,
    image TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT '',
    available INTEGER NOT NULL DEFAULT 1,
    dietary TEXT NOT NULL DEFAULT '[]',
    serves INTEGER NOT NULL DEFAULT 1,
    prepTime TEXT NOT NULL DEFAULT '15 min',
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (chefId) REFERENCES chefs(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    chefId TEXT NOT NULL,
    customerName TEXT NOT NULL,
    customerPhoto TEXT NOT NULL DEFAULT '',
    rating INTEGER NOT NULL DEFAULT 5,
    text TEXT NOT NULL DEFAULT '',
    date TEXT NOT NULL DEFAULT '',
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (chefId) REFERENCES chefs(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customerId TEXT NOT NULL,
    chefId TEXT NOT NULL,
    items TEXT NOT NULL DEFAULT '[]',
    status TEXT NOT NULL DEFAULT 'pending',
    total REAL NOT NULL DEFAULT 0,
    note TEXT NOT NULL DEFAULT '',
    pickupTime TEXT NOT NULL DEFAULT '12:00',
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (chefId) REFERENCES chefs(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'customer',
    chefId TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );
`)

// Clear existing data
db.exec("DELETE FROM orders")
db.exec("DELETE FROM reviews")
db.exec("DELETE FROM menu_items")
db.exec("DELETE FROM users")
db.exec("DELETE FROM chefs")

// Insert chefs
const insertChef = db.prepare(`
  INSERT INTO chefs (id, slug, name, title, bio, story, photo, coverImage, location, cuisineType, rating, reviewCount, deliveryAvailable, pickupAvailable, operatingHours, priceRange, joinedDate, featured, email, password)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

const chefs = [
  ["chef-1", "mama-keziah", "Mama Keziah", "Traditional Rwandan home cooking", "Cooking the flavours of my childhood for your table.", "Growing up in the hills of Rubavu, I learned everything I know from my grandmother. Every dish tells a story of family, community, and the rich soil of Rwanda. I use fresh, local ingredients and recipes passed down through generations.", "/images/chefs/keziah.jpg", "/images/chefs/keziah-cover.jpg", "Kacyiru, Kigali", '["Rwandan","Traditional","Home-style"]', 4.8, 8, 1, 1, "Mon–Sat, 8am–7pm", 2, "January 2025", 1, "keziah@iwacuchef.rw", "chef1234"],
  ["chef-2", "chef-jean-pierre", "Chef Jean-Pierre", "African fusion with a French twist", "Blending continental techniques with local ingredients.", "After training in Kigali and interning in Paris, I came home to create something new.", "/images/chefs/jean-pierre.jpg", "/images/chefs/jean-pierre-cover.jpg", "Kimihurura, Kigali", '["Fusion","French","African","Continental"]', 4.6, 2, 1, 0, "Tue–Sun, 10am–9pm", 3, "March 2025", 1, "jp@iwacuchef.rw", "chef1234"],
  ["chef-3", "amina-s-kitchen", "Amina's Kitchen", "Flavourful East African classics", "Bringing the tastes of the Swahili coast to Kigali.", "I started Amina's Kitchen from my small home in Nyamirambo, cooking the dishes my mother taught me.", "/images/chefs/amina.jpg", "/images/chefs/amina-cover.jpg", "Nyamirambo, Kigali", '["East African","Swahili","Kenyan","Tanzanian"]', 4.9, 3, 1, 1, "Mon–Sun, 7am–8pm", 1, "December 2024", 1, "amina@iwacuchef.rw", "chef1234"],
  ["chef-4", "isimbi-delicacies", "Isimbi Delicacies", "Fresh, healthy, and beautifully plated", "Wholesome meals that nourish both body and soul.", "Isimbi means 'pearl' in Kinyarwanda. I believe every meal should be a pearl.", "/images/chefs/isimbi.jpg", "/images/chefs/isimbi-cover.jpg", "Remera, Kigali", '["Healthy","Salads","Grill","International"]', 4.5, 1, 1, 1, "Mon–Fri, 8am–6pm", 2, "April 2025", 0, "isimbi@iwacuchef.rw", "chef1234"],
  ["chef-5", "chef-olivier", "Chef Olivier", "Wood-fired pizzas and Italian classics", "Authentic Italian cuisine made with Rwandan love.", "My Italian grandmother taught me to make pasta from scratch when I was seven.", "/images/chefs/olivier.jpg", "/images/chefs/olivier-cover.jpg", "Nyarutarama, Kigali", '["Italian","Pizza","Pasta","Mediterranean"]', 4.7, 2, 1, 1, "Wed–Sun, 11am–10pm", 2, "February 2025", 0, "olivier@iwacuchef.rw", "chef1234"],
  ["chef-6", "umurava-meals", "Umurava Meals", "High-protein meals for active lifestyles", "Fuel your day with food that works as hard as you do.", "Umurava means 'energy'. I started this for fellow athletes and busy professionals.", "/images/chefs/umurava.jpg", "/images/chefs/umurava-cover.jpg", "Kicukiro, Kigali", '["Healthy","High-protein","Fitness","African"]', 4.4, 1, 1, 0, "Mon–Sat, 6am–8pm", 2, "May 2025", 0, "umurava@iwacuchef.rw", "chef1234"],
]

const transaction = db.transaction(() => {
  for (const chef of chefs) {
    insertChef.run(...chef)
  }
})
transaction()
console.log(`Seeded ${chefs.length} chefs`)

// Insert menu items
const insertItem = db.prepare(`
  INSERT INTO menu_items (id, chefId, name, description, price, image, category, available, dietary, serves, prepTime)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

const items = [
  // Chef-1 - Breakfast
  ["item-100", "chef-1", "Akabanga Porridge", "Warm sorghum porridge swirled with Akabanga chilli oil, honey, and roasted peanuts.", 2500, "/images/meals/ugali-isombe.jpg", "Breakfast", 1, '["Vegan","Gluten-free"]', 1, "10 min"],
  ["item-101", "chef-1", "Ibitumbura (Sweet Potato Cakes)", "Pan-fried sweet potato cakes with turmeric, green onion, and spicy tomato salsa.", 3000, "/images/meals/samosas.jpg", "Breakfast", 1, '["Vegan","Gluten-free"]', 1, "15 min"],
  ["item-102", "chef-1", "Breakfast Bowl", "Scrambled eggs, sautéed greens, grilled tomato, and chapati with fresh fruit.", 3500, "/images/meals/ibiharage.jpg", "Breakfast", 1, '["Vegetarian"]', 1, "15 min"],
  // Appetizers
  ["item-103", "chef-1", "Samosas (x5)", "Crispy fried samosas filled with spiced beef or vegetables. Served with chili sauce.", 2500, "/images/meals/samosas.jpg", "Appetizers", 1, "[]", 2, "10 min"],
  ["item-104", "chef-1", "Brochettes (x3)", "Grilled beef skewers marinated in ginger, garlic, and soy. Served with habanero sauce.", 4000, "/images/meals/nyama-choma.jpg", "Appetizers", 1, '["Gluten-free"]', 1, "15 min"],
  ["item-105", "chef-1", "Plantain Chips & Dip", "Crispy green plantain chips with creamy avocado-lime dip and roasted tomato salsa.", 2000, "/images/meals/mandazi.jpg", "Appetizers", 1, '["Vegan","Gluten-free"]', 2, "10 min"],
  // Soups & Stews
  ["item-106", "chef-1", "Isombe Soup", "Velvety cassava leaf soup with coconut milk, ginger, and scotch bonnet.", 3000, "/images/meals/ugali-isombe.jpg", "Soups & Stews", 1, '["Vegan","Gluten-free"]', 1, "20 min"],
  ["item-107", "chef-1", "Groundnut Stew", "Rich peanut butter stew with sweet potato, okra, and spinach. Served with rice.", 4000, "/images/meals/pilau.jpg", "Soups & Stews", 1, '["Vegan","Gluten-free"]', 1, "25 min"],
  ["item-108", "chef-1", "Pumpkin & Ginger Soup", "Roasted pumpkin blended with coconut milk, fresh ginger, and chilli oil.", 3500, "/images/meals/passion-juice.jpg", "Soups & Stews", 1, '["Vegan","Gluten-free"]', 1, "20 min"],
  // Mains
  ["item-1", "chef-1", "Ugali & Isombe", "Smooth cassava ugali served with creamy cassava leaf stew, eggplant, and spinach.", 3500, "/images/meals/ugali-isombe.jpg", "Mains", 1, '["Gluten-free","Vegan option"]', 1, "20 min"],
  ["item-2", "chef-1", "Ibiharage", "Slow-cooked beans in a rich tomato and onion sauce, served with rice or chapati.", 3000, "/images/meals/ibiharage.jpg", "Mains", 1, '["Vegan","Gluten-free"]', 1, "15 min"],
  ["item-109", "chef-1", "Mizuzi & Beans", "Green bananas simmered in a coconut bean stew with smoked paprika.", 4000, "/images/meals/buddha-bowl.jpg", "Mains", 1, '["Vegan","Gluten-free"]', 1, "25 min"],
  ["item-110", "chef-1", "Rwandan Curry Plate", "Seasonal vegetables in a fragrant coconut curry with turmeric and cumin.", 4500, "/images/meals/chicken-rice-bowl.jpg", "Mains", 1, '["Vegan","Gluten-free"]', 1, "25 min"],
  ["item-111", "chef-1", "Fish Moambe", "Fresh tilapia cooked in palm butter with onions, tomatoes, and greens.", 6500, "/images/meals/tilapia.jpg", "Mains", 1, '["Gluten-free"]', 1, "30 min"],
  // Grills
  ["item-112", "chef-1", "Grilled Tilapia", "Whole tilapia marinated in lemon, garlic, herbs, grilled. Served with greens and rice.", 7000, "/images/meals/tilapia.jpg", "Grills", 1, '["Gluten-free"]', 1, "30 min"],
  ["item-113", "chef-1", "Brochette Platter", "Six skewers of grilled beef and chicken with caramelised onions and spicy mayo.", 8000, "/images/meals/nyama-choma.jpg", "Grills", 1, '["Gluten-free"]', 2, "25 min"],
  ["item-114", "chef-1", "Grilled Chicken Supreme", "Herb-marinated free-range chicken thigh, charcoal-grilled. Served with irio and kachumbari.", 6000, "/images/meals/chicken-salad.jpg", "Grills", 1, '["Gluten-free"]', 1, "25 min"],
  // Sides
  ["item-115", "chef-1", "Chapati (x2)", "Soft, flaky layers of pan-fried wheat bread.", 1000, "/images/meals/mandazi.jpg", "Sides", 1, '["Vegetarian"]', 1, "10 min"],
  ["item-116", "chef-1", "Kachumbari", "Fresh tomato, onion, cucumber salad with lime, coriander, and chilli.", 1500, "/images/meals/chicken-salad.jpg", "Sides", 1, '["Vegan","Gluten-free"]', 2, "5 min"],
  ["item-117", "chef-1", "Sautéed Greens (Dodo)", "Amaranth greens sautéed with garlic, onion, and a splash of coconut milk.", 2000, "/images/meals/buddha-bowl.jpg", "Sides", 1, '["Vegan","Gluten-free"]', 1, "10 min"],
  // Drinks
  ["item-4", "chef-1", "Fresh Passion Juice", "Freshly squeezed passion fruit juice, lightly sweetened.", 1500, "/images/meals/passion-juice.jpg", "Drinks", 1, '["Vegan","Gluten-free"]', 1, "5 min"],
  ["item-118", "chef-1", "Ikivuguto (Yogurt Drink)", "Traditional Rwandan fermented milk, lightly salted and whisked until frothy.", 2000, "/images/meals/chai.jpg", "Drinks", 1, '["Vegetarian","Gluten-free"]', 1, "2 min"],
  ["item-119", "chef-1", "Ginger & Lemongrass Tea", "Freshly steeped ginger and lemongrass tea with honey and lime.", 1500, "/images/meals/chai.jpg", "Drinks", 1, '["Vegan","Gluten-free"]', 1, "5 min"],
  ["item-120", "chef-1", "Smoothie Bowl", "Blended mango, banana, passion fruit topped with granola, coconut, chia.", 4000, "/images/meals/green-smoothie.jpg", "Drinks", 1, '["Vegan"]', 1, "8 min"],
  // Desserts
  ["item-121", "chef-1", "Sweet Potato & Honey Bake", "Roasted sweet potatoes drizzled with local honey, cinnamon, and toasted coconut.", 3000, "/images/meals/fondant.jpg", "Desserts", 1, '["Vegan","Gluten-free"]', 1, "20 min"],
  ["item-122", "chef-1", "Banana & Peanut Parfait", "Grilled bananas, Rwandan peanut butter cream, honey granola, chocolate shavings.", 3500, "/images/meals/tiramisu.jpg", "Desserts", 1, '["Vegetarian"]', 1, "10 min"],
  ["item-123", "chef-1", "Coconut Rice Pudding", "Creamy rice pudding with coconut milk, cardamom, vanilla. Served warm with mango coulis.", 3500, "/images/meals/pilau.jpg", "Desserts", 1, '["Vegan","Gluten-free"]', 1, "20 min"],
  // Other chefs
  ["item-5", "chef-2", "Grilled Tilapia with Citrus Salsa", "Whole tilapia marinated in lemon, garlic, herbs, grilled. With mango-avocado salsa.", 8500, "/images/meals/tilapia.jpg", "Mains", 1, '["Gluten-free"]', 1, "30 min"],
  ["item-6", "chef-2", "Beef Bourguignon Rwandais", "Slow-braised beef in red wine sauce with mushrooms, carrots, Rwandan spices.", 9500, "/images/meals/beef-bourguignon.jpg", "Mains", 1, "[]", 1, "45 min"],
  ["item-7", "chef-2", "French Onion Soup", "Classic French onion soup with caramelised onions, beef broth, melted Gruyère.", 5000, "/images/meals/onion-soup.jpg", "Starters", 1, "[]", 1, "20 min"],
  ["item-8", "chef-2", "Chocolate Fondant", "Warm molten chocolate cake with gooey centre. Served with vanilla ice cream.", 4500, "/images/meals/fondant.jpg", "Desserts", 1, '["Vegetarian"]', 1, "25 min"],
  ["item-9", "chef-3", "Nyama Choma Plate", "Grilled goat meat with kachumbari, ugali, and sukuma wiki.", 5000, "/images/meals/nyama-choma.jpg", "Mains", 1, '["Gluten-free"]', 1, "25 min"],
  ["item-10", "chef-3", "Pilau Rice & Beef Stew", "Fragrant spiced pilau rice with tender beef stew, cardamom, cinnamon, cloves.", 4500, "/images/meals/pilau.jpg", "Mains", 1, "[]", 1, "30 min"],
  ["item-11", "chef-3", "Mandazi (x3)", "Light fluffy East African doughnuts, lightly sweetened with cardamom.", 2000, "/images/meals/mandazi.jpg", "Snacks", 1, '["Vegetarian"]', 2, "15 min"],
  ["item-12", "chef-3", "Chai Masala", "Traditional spiced tea with ginger, cardamom, cinnamon, cloves. Made with milk.", 1000, "/images/meals/chai.jpg", "Drinks", 1, '["Vegetarian","Gluten-free"]', 1, "5 min"],
  ["item-13", "chef-4", "Buddha Bowl", "Quinoa, roasted sweet potato, avocado, chickpeas, kale, tahini dressing.", 5500, "/images/meals/buddha-bowl.jpg", "Mains", 1, '["Vegan","Gluten-free"]', 1, "20 min"],
  ["item-14", "chef-4", "Grilled Chicken Salad", "Herb-marinated grilled chicken breast on mixed greens with honey-mustard dressing.", 6000, "/images/meals/chicken-salad.jpg", "Mains", 1, '["Gluten-free"]', 1, "15 min"],
  ["item-15", "chef-4", "Green Smoothie", "Spinach, banana, mango, ginger, coconut water blended fresh.", 3000, "/images/meals/green-smoothie.jpg", "Drinks", 1, '["Vegan","Gluten-free"]', 1, "5 min"],
  ["item-16", "chef-5", "Margherita Pizza (12\")", "Wood-fired pizza with San Marzano tomato sauce, fresh mozzarella, basil.", 7000, "/images/meals/margherita.jpg", "Mains", 1, '["Vegetarian"]', 2, "20 min"],
  ["item-17", "chef-5", "Spaghetti Carbonara", "Traditional carbonara with guanciale, egg yolk, pecorino, black pepper.", 7500, "/images/meals/carbonara.jpg", "Mains", 1, "[]", 1, "25 min"],
  ["item-18", "chef-5", "Bruschetta (x4)", "Toasted sourdough with diced tomatoes, garlic, basil, balsamic glaze.", 4000, "/images/meals/bruschetta.jpg", "Starters", 1, '["Vegan"]', 2, "10 min"],
  ["item-19", "chef-5", "Tiramisu", "Classic Italian tiramisu with espresso-soaked ladyfingers, mascarpone cream.", 5000, "/images/meals/tiramisu.jpg", "Desserts", 1, '["Vegetarian"]', 1, "10 min"],
  ["item-20", "chef-6", "Grilled Chicken & Rice Bowl", "300g grilled chicken breast with brown rice, steamed broccoli, peanut sauce.", 6000, "/images/meals/chicken-rice-bowl.jpg", "Mains", 1, '["Gluten-free"]', 1, "20 min"],
  ["item-21", "chef-6", "Beef Stir-fry", "Sliced beef stir-fried with bell peppers, onions, soy-ginger sauce. Served with quinoa.", 6500, "/images/meals/beef-stirfry.jpg", "Mains", 1, "[]", 1, "20 min"],
  ["item-22", "chef-6", "Protein Shake", "Whey protein, banana, peanut butter, oats, milk. 35g protein.", 3500, "/images/meals/protein-shake.jpg", "Drinks", 1, '["Vegetarian"]', 1, "5 min"],
]

const itemTransaction = db.transaction(() => {
  for (const item of items) {
    insertItem.run(...item)
  }
})
itemTransaction()
console.log(`Seeded ${items.length} menu items`)

// Insert reviews
const insertReview = db.prepare(`
  INSERT INTO reviews (id, chefId, customerName, customerPhoto, rating, text, date)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`)

const reviews = [
  ["review-1", "chef-1", "Alice M.", "/images/customers/alice.jpg", 5, "Mama Keziah's food tastes just like my grandmother used to make. The ibiharage is absolutely incredible!", "June 2025"],
  ["review-2", "chef-1", "David K.", "/images/customers/david.jpg", 5, "I ordered the ugali and isombe for my family and everyone loved it. Generous portions and delivered on time.", "May 2025"],
  ["review-3", "chef-1", "Sarah N.", "/images/customers/sarah.jpg", 4, "Delicious home-style cooking. The passion juice is a must-try!", "May 2025"],
  ["review-4", "chef-2", "James R.", "/images/customers/james.jpg", 5, "The grilled tilapia was restaurant-quality. Jean-Pierre really knows how to blend flavours.", "June 2025"],
  ["review-5", "chef-2", "Marie-Louise B.", "/images/customers/marie.jpg", 4, "The beef bourguignon was divine. You can tell he trained in France.", "April 2025"],
  ["review-6", "chef-3", "Kevin O.", "/images/customers/kevin.jpg", 5, "Amina's nyama choma is the best I've had outside of Nairobi.", "June 2025"],
  ["review-7", "chef-3", "Grace U.", "/images/customers/grace.jpg", 5, "I order the pilau every week. It's become a family tradition.", "May 2025"],
  ["review-8", "chef-3", "Peter T.", "/images/customers/peter.jpg", 5, "The mandazi are perfect — light, fluffy, and just the right amount of sweet.", "April 2025"],
  ["review-9", "chef-4", "Claire D.", "/images/customers/claire.jpg", 5, "The Buddha bowl is my go-to lunch. Fresh, filling, and beautiful presentation.", "June 2025"],
  ["review-10", "chef-5", "Thomas W.", "/images/customers/thomas.jpg", 5, "As close to Neapolitan pizza as you can get in Kigali.", "May 2025"],
  ["review-11", "chef-5", "Sophie A.", "/images/customers/sophie.jpg", 4, "The carbonara was authentic and delicious. Chef Olivier really knows his Italian cuisine.", "April 2025"],
  ["review-12", "chef-6", "Patrick N.", "/images/customers/patrick.jpg", 4, "Perfect post-workout meal. The chicken rice bowl is generous and the peanut sauce is addictive.", "June 2025"],
  ["review-13", "chef-1", "Jean-Pierre M.", "/images/customers/james.jpg", 5, "The groundnut stew is hands-down the best I have ever had. Mama Keziah is a treasure.", "June 2025"],
  ["review-14", "chef-1", "Peace U.", "/images/customers/grace.jpg", 5, "I tried the breakfast bowl and the ginger tea — what a way to start the day!", "May 2025"],
  ["review-15", "chef-1", "Emmanuel B.", "/images/customers/kevin.jpg", 4, "Ordered the brochette platter for a small gathering. Everyone was impressed.", "April 2025"],
  ["review-16", "chef-1", "Rose K.", "/images/customers/marie.jpg", 5, "The sweet potato & honey bake is pure comfort food.", "March 2025"],
  ["review-17", "chef-1", "Patrick N.", "/images/customers/patrick.jpg", 5, "I've been ordering from Mama Keziah every week for two months. Always consistent.", "March 2025"],
]

const reviewTransaction = db.transaction(() => {
  for (const review of reviews) {
    insertReview.run(...review)
  }
})
reviewTransaction()
console.log(`Seeded ${reviews.length} reviews`)

// Insert users
const insertUser = db.prepare(`
  INSERT INTO users (id, name, email, password, role, chefId)
  VALUES (?, ?, ?, ?, ?, ?)
`)

const users = [
  ["user-1", "Alice Mutesi", "alice@example.com", "password123", "customer", null],
  ["user-2", "David Kagame", "david@example.com", "password123", "customer", null],
  ["chef-user-1", "Mama Keziah", "keziah@iwacuchef.rw", "chef1234", "chef", "chef-1"],
  ["chef-user-2", "Chef Jean-Pierre", "jp@iwacuchef.rw", "chef1234", "chef", "chef-2"],
  ["chef-user-3", "Amina's Kitchen", "amina@iwacuchef.rw", "chef1234", "chef", "chef-3"],
]

const userTransaction = db.transaction(() => {
  for (const user of users) {
    insertUser.run(...user)
  }
})
userTransaction()
console.log(`Seeded ${users.length} users`)

// Insert some sample orders
const insertOrder = db.prepare(`
  INSERT INTO orders (id, customerId, chefId, items, status, total, note, pickupTime)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`)

const orders = [
  ["order-001", "customer-1", "chef-1", '[{"menuItemId":"item-1","name":"Ugali & Isombe","quantity":2,"price":3500},{"menuItemId":"item-4","name":"Fresh Passion Juice","quantity":2,"price":1500}]', "completed", 10000, "", "12:30"],
  ["order-002", "customer-1", "chef-3", '[{"menuItemId":"item-9","name":"Nyama Choma Plate","quantity":1,"price":5000},{"menuItemId":"item-11","name":"Mandazi (x3)","quantity":2,"price":2000}]', "preparing", 9000, "Extra kachumbari please", "10:45"],
  ["order-003", "customer-1", "chef-2", '[{"menuItemId":"item-5","name":"Grilled Tilapia with Citrus Salsa","quantity":1,"price":8500}]', "confirmed", 8500, "", "12:00"],
]

const orderTransaction = db.transaction(() => {
  for (const order of orders) {
    insertOrder.run(...order)
  }
})
orderTransaction()
console.log(`Seeded ${orders.length} orders`)

db.close()
console.log("Database seeded successfully!")
