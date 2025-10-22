import { NextResponse } from "next/server";
import { getDb } from "@/app/services/server/mongo";

export async function GET() {
  try {
    const db = await getDb();
    const products = await db.collection("products").find().toArray();
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
