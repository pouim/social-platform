interface ContentCardProps {
  content: {
    _id: string;
    title: string;
    body: string;
    scheduledAt: string;
  };
}

export default function ContentCard({ content }: ContentCardProps) {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">{content.title}</h2>
        <p className="text-gray-700 mt-2">{content.body}</p>
        <p className="text-sm text-gray-500 mt-4">
          Scheduled for: {new Date(content.scheduledAt).toLocaleString()}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Edit</button>
          <button className="btn btn-secondary">Delete</button>
        </div>
      </div>
    </div>
  );
}
