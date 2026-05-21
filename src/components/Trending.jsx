import { useRef, useState } from "react";
import movie from "../../utils/movie";
import MovieView from "./MovieView";

const Trending = () => {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(false);

  const scroll = (dir) => {
    const container = scrollRef.current;
    const scrollAmount = 400;

    container.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-20 rounded-lg overflow-hidden">
    <div className="pt-20 text-white">

      <h1 className="text-4xl pl-16 pb-10 font-semibold">
        Trending Now
      </h1>

      <div className="relative group">
        {/* LEFT BUTTON */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 
          bg-white/10 backdrop-blur-md 
          hover:bg-white/20 
          text-white text-2xl 
          px-4 py-6 rounded-xl transition"
        >
          ‹
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 
          bg-white/10 backdrop-blur-md 
          hover:bg-white/20 
          text-white text-2xl 
          px-4 py-6 rounded-xl transition"
        >
          ›
        </button>

        {/* CAROUSEL */}
        <div
          ref={scrollRef}
          className="
          flex gap-8 
          overflow-x-auto 
          scroll-smooth 
          no-scrollbar
          
          px-25   /* 👈 LEFT + RIGHT PADDING (center feel) */
        "
        >
          {movie.map((item) => (
            <div
              key={item.id}
              className="relative min-w-[220px] group/card"
            >
              {/* NUMBER (like image) */}
              <h1 className=" z-100 absolute bottom-2 -left-6 text-[120px] font-bold text-black leading-none">
                {item.id}
              </h1>

              <h1 className=" z-100 absolute bottom-2 -left-6 text-[120px] font-bold text-black stroke-text leading-none">
                {item.id}
              </h1>

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                onClick={() => setActive(true)}
                className="
                h-72 w-full object-cover rounded-xl 
                cursor-pointer 
                transition duration-500 
                group-hover/card:scale-105
              "
              />
            </div>
          ))}
        </div>
      </div>

      {active && <MovieView onClose={() => setActive(false)} />}
    </div>
    </div>
  );
};

export default Trending;