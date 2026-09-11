import { ChevronDown } from "lucide-react";
import { useState } from "react";
export default function FAQ() {
  const items = [
    [
      "What is StreamFlix?",
      "A polished streaming discovery experience for movies and TV, powered by TMDB metadata.",
    ],
    [
      "Can I save titles?",
      "Yes. Sign in and use My List to save titles locally for a fast personal library.",
    ],
    [
      "Can I watch trailers?",
      "Yes. Trailer playback opens inside StreamFlix using an embedded player. You can also configure a licensed video URL for your own media.",
    ],
    [
      "Is StreamFlix a Netflix service?",
      "No. StreamFlix is an independent demonstration project and is not affiliated with Netflix.",
    ],
  ];
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto mt-20 max-w-3xl">
      {items.map(([q, a], i) => (
        <div key={q} className="border-b border-white/10">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center justify-between py-6 text-left text-lg font-semibold"
          >
            {q}
            <ChevronDown
              className={`transition ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <p className="pb-6 pr-10 text-sm leading-7 text-white/45">{a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
