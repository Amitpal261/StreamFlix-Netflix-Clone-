import Navbar from "../../components/Navbar";
import TvShowHero from "../../components/TvShowHero";
import MovieRow from "../../components/MovieRow";
import SkeletonRow from "../../components/Skeletonrow";
import Footer from "../../components/Footer";
import {
  useGetTrendingQuery,
  useGetTopRatedQuery,
  useGetByGenreQuery,
} from "../../services/moviesApi";

const Home = () => {
  const { data: trending, isLoading: trendingLoading } = useGetTrendingQuery();
  const { data: topRated, isLoading: topLoading } = useGetTopRatedQuery();

  const { data: action, isLoading: actionLoading } = useGetByGenreQuery(28);
  const { data: comedy, isLoading: comedyLoading } = useGetByGenreQuery(35);
  const { data: horror, isLoading: horrorLoading } = useGetByGenreQuery(27);

  const isLoading =
    trendingLoading ||
    topLoading ||
    actionLoading ||
    comedyLoading ||
    horrorLoading;

  return (
    <div className="bg-black text-white min-h-screen">
      
      <TvShowHero />

      {/* ✅ SAME OVERLAP DESIGN */}
      <div className="mt-[-100px] relative z-20 px-6 space-y-8">
        {isLoading ? (
          [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
        ) : (
          <>
            <MovieRow title="Trending Now" movies={trending?.results} />
            <MovieRow title="Top Rated" movies={topRated?.results} />
            <MovieRow title="Action Movies" movies={action?.results} />
            <MovieRow title="Comedy" movies={comedy?.results} />
            <MovieRow title="Horror" movies={horror?.results} />
          </>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Home;