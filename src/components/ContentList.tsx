"use client";

import { useState } from "react";
import { getAllContent } from "@/app/api/lib/contentActions";
import ContentCard from "./ContentCard/ContentCard";

export default function ContentList({ contents }: { contents: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {contents.map((content) => (
        <ContentCard key={content._id} content={content} />
      ))}
    </div>
  );
}
