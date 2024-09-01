import ContentCard from "./ContentCard";

export default function ContentList({ contents }: { contents: any[] }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {contents.map((content) => (
        <ContentCard key={content._id} content={content} />
      ))}
    </div>
  );
}
