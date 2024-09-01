"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "./dbConnect";
import ContentModel from "../models/Content";

export async function getAllContent() {
  await dbConnect();
  return ContentModel.find().sort({ createdAt: -1 }).lean();
}

export async function getContentById(id: string) {
  await dbConnect();
  return ContentModel.findById(id).lean();
}

interface CreateContentData {
  title: string;
  body: string;
  images?: string[];
  isPublished?: boolean;
  scheduledAt?: Date | null;
  socialMedia?: string[];
}

export async function createContent(data: CreateContentData) {
  await dbConnect();

  const contentData = {
    ...data,
    isPublished: data.isPublished || false,
    scheduledAt: data.scheduledAt || null,
    publishedAt: data.isPublished ? new Date() : null,
    socialMedia: data.socialMedia || [],
  };

  const newContentDoc = await ContentModel.create(contentData);

  const newContent = newContentDoc.toObject();

  revalidatePath("/content");

  return newContent;
}

export async function updateContent(id: string, data: any) {
  await dbConnect();
  revalidatePath("/content");
  return ContentModel.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteContent(id: string) {
  await dbConnect();
  revalidatePath("/content");
  return ContentModel.findByIdAndDelete(id);
}

export async function publishContent(id: string) {
  await dbConnect();
  revalidatePath("/content");
  return ContentModel.findByIdAndUpdate(
    id,
    { isPublished: true, publishedAt: new Date() },
    { new: true }
  );
}

export async function unpublishContent(id: string) {
  await dbConnect();
  revalidatePath("/content");
  return ContentModel.findByIdAndUpdate(
    id,
    { isPublished: false, publishedAt: null },
    { new: true }
  );
}
