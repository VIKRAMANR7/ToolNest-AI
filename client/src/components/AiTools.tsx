import { useClerk, useUser } from "@clerk/clerk-react";
import { Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AiToolsData } from "../assets/assets";

export default function AiTools() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  function handleToolClick(path: string) {
    if (!user) {
      openSignIn();
      return;
    }
    navigate(path);
  }

  return (
    <section className="bg-gray-50 px-4 py-20 sm:px-20 xl:px-32">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Powerful AI Tools</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Everything you need to create, enhance, and optimize your content.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {AiToolsData.map((tool) => (
          <div
            key={tool.id}
            onClick={() => handleToolClick(tool.path)}
            className="group relative cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            {tool.premium && (
              <div className="absolute top-4 right-4">
                <Crown className="size-5 text-amber-500" fill="currentColor" />
              </div>
            )}

            <div
              className="mb-6 inline-flex rounded-xl p-3 shadow-md"
              style={{
                background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            >
              <tool.Icon className="size-8 text-white" />
            </div>

            <h3 className="mb-3 text-xl font-semibold text-gray-900">{tool.title}</h3>
            <p className="text-sm leading-relaxed text-gray-600">{tool.description}</p>

            <div className="group-hover:border-primary/20 absolute inset-0 rounded-2xl border-2 border-transparent transition-colors" />
          </div>
        ))}
      </div>
    </section>
  );
}
