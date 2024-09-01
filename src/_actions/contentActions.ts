"use server";

import dbConnect from "@/lib/dbConnect";
import ContentModel from "@/models/Content";

export async function getAllContent() {
  await dbConnect();
  return ContentModel.find().sort({ createdAt: -1 }).lean();
}

export async function getContentById(id: string) {
  await dbConnect();
  return ContentModel.findById(id).lean();
}

export async function createContent(data: {
  title: string;
  body: string;
  images?: string[];
}) {
  await dbConnect();
  return ContentModel.create(data);
}

export async function updateContent(id: string, data: any) {
  await dbConnect();
  return ContentModel.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteContent(id: string) {
  await dbConnect();
  return ContentModel.findByIdAndDelete(id);
}

export async function publishContent(id: string) {
  await dbConnect();
  return ContentModel.findByIdAndUpdate(
    id,
    { isPublished: true, publishedAt: new Date() },
    { new: true }
  );
}

export async function unpublishContent(id: string) {
  await dbConnect();
  return ContentModel.findByIdAndUpdate(
    id,
    { isPublished: false, publishedAt: null },
    { new: true }
  );
}
