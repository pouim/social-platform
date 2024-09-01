import ContentEditor from "@/components/ContentEditor";

export default function CreateContentPage() {
  return (
    <div className="container mx-auto p-4" style={{ height: "100vh" }}>
      <h1 className="text-3xl font-bold mb-4">Create New Content</h1>
      <ContentEditor />
    </div>
  );
}
