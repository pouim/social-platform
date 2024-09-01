import { ReactNode } from "react";
import { format } from "date-fns";
import { Content } from "@/types";
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { DeleteButton, PublishButton, UnPublishButton } from "./Actions";

export default function ContentCard({ content }: { content: Content }) {
  const socialMediaIcons: Record<string, ReactNode> = {
    Twitter: <FaTwitter className="text-blue-400" />,
    Facebook: <FaFacebook className="text-blue-600" />,
    LinkedIn: <FaLinkedin className="text-blue-700" />,
    Instagram: <FaInstagram className="text-pink-500" />,
  };

  return (
    <div className="card w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white">{content.title}</h2>

        <div className="mt-4 flex flex-wrap items-center space-x-2">
          {content.isPublished && <StatusBadge status="Published" />}

          {content.isPublished && content.publishedAt && (
            <Badge
              label={`Published At: ${format(
                new Date(content.publishedAt),
                "PPpp"
              )}`}
            />
          )}
          {content.scheduledAt && !content.isPublished && (
            <Badge
              label={`Scheduled For: ${format(
                new Date(content.scheduledAt),
                "PPpp"
              )}`}
            />
          )}
        </div>
        <div className="mt-4">
          {content.socialMedia && content.socialMedia.length > 0 && (
            <div className="flex items-center space-x-2 mt-2">
              {content.socialMedia.map((platform) => (
                <span key={platform} title={platform}>
                  {socialMediaIcons[platform]}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-end space-x-2">
          {!content.isPublished && <PublishButton content={content} />}
          {content.isPublished && <UnPublishButton content={content} />}
          <DeleteButton contentId={content._id} />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusColor = status === "Published" ? "bg-teal-900" : "bg-sky-900";
  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-full ${statusColor}`}
      style={{
        background: statusColor,
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {status}
    </span>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span
      className="inline-block px-3 py-1 text-sm font-semibold text-gray-200 rounded-full bg-gray-700"
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {label}
    </span>
  );
}
