import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // We don't need separate _id for each post
);

const EcommSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    posts: [postSchema], // Add an array of posts
  },
  { timestamps: true }
);

const Ecomm = models.Ecomm || mongoose.model("Ecomm", EcommSchema);
export default Ecomm;