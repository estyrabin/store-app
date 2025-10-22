import { NextRequest, NextResponse } from "next/server";

type SignupBody = {
  fullName: string;
  phone: string;
  email: string;
  dob: string; 
};

function calcIsOver18(dob: string): boolean {
  const date = new Date(dob);
  if (Number.isNaN(date.getTime())) return false;

  const now = new Date();
  let age = now.getFullYear() - date.getFullYear();
  const m = now.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < date.getDate())) {
    age--;
  }
  return age >= 18;
}

export async function POST(req: NextRequest) {
  const { fullName, phone, email, dob } = (await req.json()) as Partial<SignupBody>;

  const errors: Record<string, string> = {};

  // fullName
  if (
    !fullName ||
    fullName.trim().split(/\s+/).length < 2 ||
    fullName.trim().split(/\s+/).some((w) => /^\d/.test(w))
  ) {
    errors.fullName = "שם מלא לא תקין";
  }

  // phone
  if (!phone || !/^[0-9]+$/.test(phone)) {
    errors.phone = "טלפון לא תקין";
  }

  // email
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "אימייל לא תקין";
  }

  // dob
  if (!dob) {
    errors.dob = "נא להזין תאריך לידה";
  } else if (!calcIsOver18(dob)) {
    errors.dob = "צריך להיות מעל גיל 18";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "נרשמת בהצלחה!" }, { status: 200 });
}
