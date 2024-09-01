import {
  publishContent,
  unpublishContent,
  deleteContent,
} from "@/_actions/contentActions";

export default function ContentCard({ content }: { content: any }) {
  const handlePublishToggle = async () => {
    if (content.isPublished) {
      await unpublishContent(content._id);
    } else {
      await publishContent(content._id);
    }
  };

  const handleDelete = async () => {
    await deleteContent(content._id);
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">{content.title}</h2>
        <p className="text-gray-700 mt-2">{content.body}</p>
        <p className="text-sm text-gray-500 mt-4">
          {content.isPublished ? "Published" : "Scheduled"}
        </p>
        <div className="card-actions justify-end">
          <button onClick={handlePublishToggle} className="btn btn-primary">
            {content.isPublished ? "Unpublish" : "Publish"}
          </button>
          <button onClick={handleDelete} className="btn btn-secondary">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
