"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function ContentEditor({
  onSave,
}: {
  onSave: (data: { title: string; body: string; images?: string[] }) => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSave = () => {
    onSave({ title, body });
  };

  return (
    <div className="w-full p-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
      <ReactQuill value={body} onChange={setBody} />
      <button onClick={handleSave} className="btn btn-primary mt-4">
        Save Content
      </button>
    </div>
  );
}
