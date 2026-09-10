import { useEffect, useState } from "react";
import Card from "./Card";
import { API_READ_ACCESS_TOKEN } from "../../utils/contest";
import { useDispatch } from "react-redux";
import { setTrendingMovies } from "../features/auth/trendingMovieSilce";

const Row = ({ title }) => {
   const [TrendingMovie, setTrendingMovie] = useState([]);
   const dispatch = useDispatch();

    useEffect(() => {
       fetch("https://api.themoviedb.org/3/person/popular?language=en-US&page=1", {
        headers: {
          Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`, 
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const safeResults = Array.isArray(data.results) ? data.results : [];
          setTrendingMovie(safeResults);
          dispatch(setTrendingMovies(safeResults));
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
          setTrendingMovie([]);
        });
  
    }, [ dispatch ]);

  const cards = TrendingMovie.slice(0, 50).map((movie) => {
    const item = movie?.known_for?.[2] || movie?.known_for?.[1] || movie?.known_for?.[0] || {};
    const src = item?.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
      : "https://images.unsplash.com/photo-1524989941526-cf5f5d4c3a1d?auto=format&fit=crop&w=900&q=80";
    const name = item?.title || movie?.name || "Popular title";

    return { src, name };
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">{title}</h2>

      <div className="flex gap-4 overflow-x-scroll scrollbar-hide">
        {cards.map((movie, i) => (
          <Card key={`${movie.name}-${i}`} src={movie.src} name={movie.name} />
        ))}
      </div>
    </div>
  );
};

export default Row;