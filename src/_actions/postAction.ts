"use server";

import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/Content";

export async function getPosts() {
  try {
    await dbConnect();

    const data = await PostModel.find();
    const parsedData = JSON.parse(JSON.stringify(data));

    return { data: parsedData };
  } catch (error: any) {
    return { errorMsg: error.message };
  }
}
