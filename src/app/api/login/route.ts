import { NextRequest, NextResponse } from "next/server";

type LoginBody = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json()) as LoginBody;

  if (email === "user@gmail.com" && password === "123456") {
    return NextResponse.json(
      { success: true, message: "התחברת בהצלחה." },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { success: false, message: "שם משתמש או סיסמא שגויים." },
    { status: 401 }
  );
}
