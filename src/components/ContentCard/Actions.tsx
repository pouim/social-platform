import { useState } from "react";
import {
  publishContent,
  unpublishContent,
  deleteContent,
} from "@/app/api/lib/contentActions";
import { Content } from "@/types";

export function PublishButton({ content }: { content: Content }) {
  const { isPublished } = content;
  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      if (!isPublished) {
        await publishContent(content._id);
        // You may want to add a callback to refresh the content list or show a success message
      }
    } catch (error) {
      // Handle error here, e.g., show a notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePublish}
      className={`btn ${
        isPublished
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-teal-800 hover:bg-teal-900"
      } text-white font-semibold py-2 px-4 rounded-10 transition duration-200 ease-in-out`}
      disabled={isPublished || isLoading}
    >
      {isLoading
        ? "Publishing..."
        : isPublished
        ? "Already Published"
        : "Publish Now"}
    </button>
  );
}

export function UnPublishButton({ content }: { content: Content }) {
  const { isPublished } = content;
  const [isLoading, setIsLoading] = useState(false);

  const handleUnPublish = async () => {
    setIsLoading(true);
    try {
      if (isPublished) {
        await unpublishContent(content._id);
        // You may want to add a callback to refresh the content list or show a success message
      }
    } catch (error) {
      // Handle error here, e.g., show a notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleUnPublish}
      className={`btn ${
        !isPublished
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-neutral-600 hover:bg-neutral-700"
      } text-white font-semibold py-2 px-4 rounded-10 transition duration-200 ease-in-out`}
      disabled={!isPublished || isLoading}
    >
      {isLoading
        ? "Revoking..."
        : isPublished
        ? "Revoke Publish"
        : "Not Published"}
    </button>
  );
}

export function DeleteButton({ contentId }: { contentId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteContent(contentId);
      // You may want to add a callback to remove the content from the list or show a success message
    } catch (error) {
      // Handle error here, e.g., show a notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn bg-red-800 hover:bg-red-900 text-white font-semibold py-2 px-4 rounded-10 transition duration-200 ease-in-out"
      disabled={isLoading}
    >
      {isLoading ? "Deleting..." : "Delete"}
    </button>
  );
}
