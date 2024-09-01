"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "./dbConnect";
import ContentModel from "../models/Content";

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN!;
const INSTAGRAM_BUSINESS_ACCOUNT_ID =
  process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID!;

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

export async function publishContent(contentId: string) {
  const content = await ContentModel.findById(contentId);

  if (!content) throw new Error("Content not found");

  if (content.socialMedia.includes("Instagram")) {
    const imageUrl = "https://your-image-url.com/image.jpg";
    const caption = content.body;

    try {
      // Step 1: Create a Media Object Container
      const mediaContainerResponse = await fetch(
        `https://graph.facebook.com/v20.0/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image_url: imageUrl,
            caption: caption,
            access_token: INSTAGRAM_ACCESS_TOKEN,
          }),
        }
      );

      const mediaContainerData = await mediaContainerResponse.json();

      if (!mediaContainerResponse.ok) {
        throw new Error(
          `Error creating media container: ${mediaContainerData.error.message}`
        );
      }

      // Step 2: Publish the Media Object
      const mediaPublishResponse = await fetch(
        `https://graph.facebook.com/v20.0/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media_publish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            creation_id: mediaContainerData.id,
            access_token: INSTAGRAM_ACCESS_TOKEN,
          }),
        }
      );

      const mediaPublishData = await mediaPublishResponse.json();

      if (!mediaPublishResponse.ok) {
        throw new Error(
          `Error publishing media: ${mediaPublishData.error.message}`
        );
      }

      // Update content status in the database
      await ContentModel.findByIdAndUpdate(contentId, {
        isPublished: true,
        publishedAt: new Date(),
      });

      console.log("Instagram Post ID:", mediaPublishData.id);
    } catch (error: any) {
      console.error("Failed to publish on Instagram:", error);
      throw new Error(`Failed to publish on Instagram: ${error.message}`);
    }
  }
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
