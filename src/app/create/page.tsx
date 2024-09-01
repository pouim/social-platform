import { createContent } from "@/_actions/contentActions";
import ContentEditor from "@/components/ContentEditor";

export default function CreateContentPage() {
  const handleSave = async (data: {
    title: string;
    body: string;
    images?: string[];
  }) => {
    await createContent(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Content</h1>
      <ContentEditor onSave={handleSave} />
    </div>
  );
}
