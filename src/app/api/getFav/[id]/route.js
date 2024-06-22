import Ecomm from "@/app/models/Ecomm";
import connectMongoDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";



export async function GET(request, {params}){

  const {id} = params;
  await connectMongoDB;
  const favProducts = await Ecomm.findOne({_id: id})
  return NextResponse.json({favProducts}, {status: 200})
}