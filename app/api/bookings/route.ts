import { NextRequest, NextResponse } from "next/server";
import { getAllBookings, createBooking, getApprovedBookings } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { startOfDay } from "date-fns";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const adminView = searchParams.get("admin") === "true";

  if (adminView) {
    if (!isAdminAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const bookings = getAllBookings();
    return NextResponse.json(bookings);
  }

  // Public view: only approved bookings (dates only)
  const bookings = getApprovedBookings();
  const publicBookings = bookings.map((b) => ({
    id: b.id,
    start_date: b.start_date,
    end_date: b.end_date,
  }));
  return NextResponse.json(publicBookings);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, organization, start_date, end_date, purpose, guests, message } = body;

    if (!name || !email || !phone || !start_date || !end_date || !purpose || !guests) {
      return NextResponse.json(
        { error: "Manglende påkrevde felt" },
        { status: 400 }
      );
    }

    // Validate dates
    const start = new Date(start_date);
    const end = new Date(end_date);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json({ error: "Ugyldig dato" }, { status: 400 });
    }
    if (end <= start) {
      return NextResponse.json(
        { error: "Sluttdato må være etter startdato" },
        { status: 400 }
      );
    }
    if (startOfDay(start) < startOfDay(new Date())) {
      return NextResponse.json(
        { error: "Startdato kan ikke være i fortiden" },
        { status: 400 }
      );
    }

    const booking = createBooking({
      name,
      email,
      phone,
      organization,
      start_date,
      end_date,
      purpose,
      guests: Number(guests),
      message,
    });

    return NextResponse.json(booking, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Intern serverfeil" },
      { status: 500 }
    );
  }
}
