import Ecomm from "@/app/models/Ecomm";
import connectMongoDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connectMongoDB();
  const { userId, text } = await req.json(); // Parse the request body

  if (!userId || !text) {
    return NextResponse.json({ success: false, message: "Missing userId or text" }, { status: 400 });
  }

  try {
    const user = await Ecomm.findById(userId);
    if (user) {
      user.posts.push({ text });
      await user.save();
      return NextResponse.json({ success: true, message: "Post added successfully" });
    } else {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
};

export const GET = async (req) => {
  await connectMongoDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ success: false, message: "Missing userId" }, { status: 400 });
  }

  try {
    const user = await Ecomm.findById(userId);
    if (user) {
      return NextResponse.json({ success: true, posts: user.posts });
    } else {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
};
