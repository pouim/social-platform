import { getAllContent } from "@/_actions/contentActions";
import ContentList from "@/components/ContentList";

export default async function DashboardPage() {
  const contents = await getAllContent();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <ContentList contents={contents} />
    </div>
  );
}
