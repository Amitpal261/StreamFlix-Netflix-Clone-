import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import PosterCard from "./PosterCard";
export default function Rail({
  title,
  items = [],
  top10 = false,
  onPlay,
  onToggleList,
  list = [],
}) {
  const ref = useRef(null);
  const scroll = (dir) =>
    ref.current?.scrollBy({
      left: dir * Math.min(ref.current.clientWidth * 0.8, 900),
      behavior: "smooth",
    });
  if (!items?.length) return null;
  return (
    <section className="group/rail relative mt-10 sm:mt-14">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.3em] text-red-500">
            StreamFlix
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
            {title}
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scroll(-1)}
            className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[.04] hover:bg-white/10"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[.04] hover:bg-white/10"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="no-scrollbar flex gap-3 overflow-x-auto pb-4 sm:gap-4"
      >
        {items.slice(0, 20).map((item, i) => (
          <PosterCard
            key={`${item.id}-${i}`}
            item={item}
            index={top10 ? i + 1 : null}
            onPlay={onPlay}
            onToggleList={onToggleList}
            inList={list.some((x) => x.id === item.id)}
          />
        ))}
      </div>
    </section>
  );
}
