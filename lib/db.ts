import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "bookings.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      organization TEXT,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      purpose TEXT NOT NULL,
      guests INTEGER NOT NULL,
      message TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  return db;
}

export type BookingStatus = "pending" | "approved" | "rejected";

export interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  organization: string | null;
  start_date: string;
  end_date: string;
  purpose: string;
  guests: number;
  message: string | null;
  status: BookingStatus;
  created_at: string;
}

export interface NewBooking {
  name: string;
  email: string;
  phone: string;
  organization?: string;
  start_date: string;
  end_date: string;
  purpose: string;
  guests: number;
  message?: string;
}

export function getAllBookings(): Booking[] {
  const database = getDb();
  return database
    .prepare("SELECT * FROM bookings ORDER BY start_date ASC")
    .all() as Booking[];
}

export function getApprovedBookings(): Booking[] {
  const database = getDb();
  return database
    .prepare(
      "SELECT * FROM bookings WHERE status = 'approved' ORDER BY start_date ASC"
    )
    .all() as Booking[];
}

export function createBooking(booking: NewBooking): Booking {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO bookings (name, email, phone, organization, start_date, end_date, purpose, guests, message)
    VALUES (@name, @email, @phone, @organization, @start_date, @end_date, @purpose, @guests, @message)
  `);
  const result = stmt.run({
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    organization: booking.organization ?? null,
    start_date: booking.start_date,
    end_date: booking.end_date,
    purpose: booking.purpose,
    guests: booking.guests,
    message: booking.message ?? null,
  });
  return database
    .prepare("SELECT * FROM bookings WHERE id = ?")
    .get(result.lastInsertRowid) as Booking;
}

export function updateBookingStatus(
  id: number,
  status: BookingStatus
): Booking | null {
  const database = getDb();
  database
    .prepare("UPDATE bookings SET status = ? WHERE id = ?")
    .run(status, id);
  return database
    .prepare("SELECT * FROM bookings WHERE id = ?")
    .get(id) as Booking | null;
}

export function deleteBooking(id: number): boolean {
  const database = getDb();
  const result = database
    .prepare("DELETE FROM bookings WHERE id = ?")
    .run(id);
  return result.changes > 0;
}
