import ContentList from "@/components/ContentList";
import { getAllContent } from "@/app/api/lib/contentActions";

export default async function ContentPage() {
  const contents = await getAllContent();

  return (
    <div className="container mx-auto p-4" style={{ height: "100vh" }}>
      <h1 className="text-3xl font-bold mb-12">Contents</h1>
      <ContentList contents={contents} />
    </div>
  );
}
