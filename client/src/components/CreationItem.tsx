import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";
import type { Creation } from "../types/database";

interface CreationItemProps {
  item: Creation;
}

export default function CreationItem({ item }: CreationItemProps) {
  const [expanded, setExpanded] = useState(false);

  function toggleExpand(): void {
    setExpanded((prev) => !prev);
  }

  const isImage = item.type === "image";

  return (
    <div
      onClick={toggleExpand}
      className="max-w-5xl cursor-pointer rounded-lg border border-gray-200 bg-white p-4 text-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="line-clamp-2 font-medium text-gray-800">{item.prompt}</h2>
          <p className="text-xs text-gray-500">
            {item.type} • {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-4 py-1 text-xs font-medium text-[#1e40af]">
            {item.type}
          </button>

          {expanded ? (
            <ChevronUp className="size-4 text-gray-400" />
          ) : (
            <ChevronDown className="size-4 text-gray-400" />
          )}
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          expanded ? "mt-4 max-h-[800px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        {isImage ? (
          <div className="flex justify-center">
            <img
              src={item.content}
              alt="Generated"
              className="mt-3 w-full max-w-md rounded-lg border border-gray-100 shadow-sm"
            />
          </div>
        ) : (
          <div className="prose mt-3 max-w-none text-sm text-slate-700">
            <Markdown skipHtml>{item.content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}
