import { model, models, Schema } from "mongoose";

const contentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    images: [String],
    isPublished: {
      type: Boolean,
      default: false,
    },
    scheduledAt: Date,
    publishedAt: Date,
  },
  { timestamps: true }
);

const ContentModel = models.content || model("content", contentSchema);

export default ContentModel;
