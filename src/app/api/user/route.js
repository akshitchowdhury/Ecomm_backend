
import Ecomm from "@/app/models/Ecomm";
import { NextResponse } from "next/server";
import connectMongoDB from "@/app/lib/mongodb";

export async function POST(request) {
  const { name, email } = await request.json();
  await connectMongoDB();
  await Ecomm.create({ name, email });
  return NextResponse.json({ message: "Ecomm Registered" }, { status: 201 });
}