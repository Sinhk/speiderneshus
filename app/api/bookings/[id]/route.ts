import { NextRequest, NextResponse } from "next/server";
import { updateBookingStatus, deleteBooking, BookingStatus } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const bookingId = parseInt(id, 10);
  if (isNaN(bookingId)) {
    return NextResponse.json({ error: "Ugyldig ID" }, { status: 400 });
  }

  const body = await request.json();
  const { status } = body;

  if (!["pending", "approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Ugyldig status" }, { status: 400 });
  }

  const booking = updateBookingStatus(bookingId, status as BookingStatus);
  if (!booking) {
    return NextResponse.json(
      { error: "Bestilling ikke funnet" },
      { status: 404 }
    );
  }

  return NextResponse.json(booking);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const bookingId = parseInt(id, 10);
  if (isNaN(bookingId)) {
    return NextResponse.json({ error: "Ugyldig ID" }, { status: 400 });
  }

  const deleted = deleteBooking(bookingId);
  if (!deleted) {
    return NextResponse.json(
      { error: "Bestilling ikke funnet" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
