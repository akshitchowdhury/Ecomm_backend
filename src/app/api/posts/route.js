import Ecomm from "@/app/models/Ecomm";
import connectMongoDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = async (req) => {
  await connectMongoDB();
  const { userId, title, description, category,productId, price,hasfavorited, brand, images } = await req.json(); // Parse the request body
// !brand ||
  if (!userId || !title ||!productId|| !description || !category || !hasfavorited|| !price ||  !images || !images.length) {
    return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
  }

  const image = images[0]; // Extract the first image

  try {
    const user = await Ecomm.findById(new mongoose.Types.ObjectId(userId)); // Use 'new' keyword correctly
    if (user) {
      const existingPost = user.posts.find(post => post.title === title);
      if (existingPost) {
        return NextResponse.json({ success: true, message: "Product already favorited" });
      }

      const newPost = {
        title,
        description,
        category,
        price,
        productId,
        hasfavorited,
        brand,
        image,
      };
      user.posts.push(newPost);
      await user.save();
      return NextResponse.json({ success: true, message: "Product favorited successfully" });
    } else {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error: " + error.message }, { status: 500 });
  }
};
