import { getPosts } from "@/_actions/postAction";
import ContentCard from "@/components/ContentCard";

export default async function ContentPage() {
  const { data, errorMsg } = await getPosts();

  if (errorMsg) return <h1>{errorMsg}</h1>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Content</h1>
      {data.map((item: any) => (
        <h1 key={item._id}>{item.msg}</h1>
      ))}
    </div>
  );
}
