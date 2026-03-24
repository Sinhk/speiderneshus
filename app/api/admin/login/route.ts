import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: "Passord mangler" }, { status: 400 });
    }

    const token = checkAdminPassword(password);
    if (!token) {
      return NextResponse.json({ error: "Feil passord" }, { status: 401 });
    }

    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: "Intern serverfeil" }, { status: 500 });
  }
}

