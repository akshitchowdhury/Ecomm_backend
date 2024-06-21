import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    // productId: {
    //   type: Number, // Assuming product ID from the dummy API is a number
    //   required: true,
    // },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true } // Use default _id field
);

const EcommSchema = new mongoose.Schema(
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
    posts: [postSchema], // Array of posts
  },
  { timestamps: true }
);

const Ecomm = mongoose.models.Ecomm || mongoose.model("Ecomm", EcommSchema);
export default Ecomm;
