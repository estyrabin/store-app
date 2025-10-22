import { NextRequest, NextResponse } from "next/server";

type LoginBody = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json()) as LoginBody;

  if (email === "user@example.com" && password === "password123") {
    return NextResponse.json(
      { success: true, message: "Login successful." },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials." },
    { status: 401 }
  );
}
