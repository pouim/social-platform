import cron from "node-cron";
import dbConnect from "./dbConnect";
import ContentModel from "../models/Content";
import { publishContent } from "./contentActions";

async function publishScheduledContent() {
  await dbConnect();

  const now = new Date();
  const contents = await ContentModel.find({
    isPublished: false,
    scheduledAt: { $lte: now },
  });

  for (const content of contents) {
    await publishContent(content._id);
  }
}

// Run this task every minute to check for content that needs to be published
cron.schedule("* * * * *", publishScheduledContent);
