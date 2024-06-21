import Ecomm from "@/app/models/Ecomm";
import { NextResponse } from "next/server";
import connectMongoDB from "@/app/lib/mongodb";

export async function POST(request) {
  const { name, email } = await request.json();
  await connectMongoDB();
  try {
    await Ecomm.create({ name, email });
    return NextResponse.json({ message: "Ecomm Registered" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Registration failed: " + error.message }, { status: 500 });
  }
}
