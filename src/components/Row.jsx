import { useEffect, useState } from "react";
import Card from "./Card";
import { API_READ_ACCESS_TOKEN } from "../../utils/contest";
import { useDispatch } from "react-redux";
import { setTrendingMovies } from "../features/auth/trendingMovieSilce";

const Row = ({ title }) => {
   const [TrendingMovie, setTrendingMovie] = useState([]);
   const dispatch = useDispatch();
   console.log("TrendingMovie State:", TrendingMovie); // Log the state to see if it's being updated
    useEffect(() => {
       fetch("https://api.themoviedb.org/3/person/popular?language=en-US&page=1", {
        headers: {
          Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`, 
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTrendingMovie(data.results);
          dispatch(setTrendingMovies(data.results)); // Dispatch the action to update the Redux store
          console.log("Fetched Trending:", data.results); // Log the fetched trending data
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
  
    }, [ dispatch ]);
  const movies = TrendingMovie.slice(0, 50).map((movie) => `https://image.tmdb.org/t/p/w500${movie.known_for[2].backdrop_path}`);
  console.log("Movies Array:", movies); // Log the movies array to see if it's being created correctly
  const names = TrendingMovie.slice(0, 50).map((movie) => movie.known_for[2].title || movie.name);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">{title}</h2>

      <div className="flex gap-4 overflow-x-scroll scrollbar-hide">
        {movies.map((movie, i) => (
          <Card key={i} src={movie} name = {names[i]}/>
        ))}
      </div>
    </div>
  );
};

export default Row;