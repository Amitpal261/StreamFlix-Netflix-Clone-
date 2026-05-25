const MovieRow = ({ title, movies }) => {
  return (
    <div className="px-6 mt-10">
      
      {/* 🔥 Title */}
      <h2 className="text-white text-2xl font-semibold mb-6 tracking-wide">
        {title}
      </h2>

      {/* 🎬 Row */}
      <div
        className="
          flex gap-6 overflow-x-auto scroll-smooth
          scrollbar-hide
          pb-4
        "
      >
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[180px] group cursor-pointer"
          >
            {/* 🎥 Image */}
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="
                  w-full h-[260px] object-cover
                  transition duration-500
                  group-hover:scale-110
                "
              />

              {/* 🔥 Gradient Overlay */}
              <div className="
                absolute inset-0
                bg-gradient-to-t from-black/80 via-black/20 to-transparent
                opacity-0 group-hover:opacity-100
                transition duration-300
              " />

              {/* 🎬 Title on hover */}
              <p className="
                absolute bottom-3 left-3 right-3
                text-sm font-semibold text-white
                opacity-0 group-hover:opacity-100
                transition duration-300
              ">
                {movie.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;