import Database from "better-sqlite3"
import path from "path"

const DB_PATH = path.join(process.cwd(), "data", "iwacu.db")

let _db: Database.Database | null = null

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH)
    _db.pragma("journal_mode = WAL")
    _db.pragma("foreign_keys = ON")
  }
  return _db
}

export function initDb(): void {
  const db = getDb()

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
}
