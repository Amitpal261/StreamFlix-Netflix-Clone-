import TvShowHero from "../../components/TvShowHero";
import MovieRow from "../../components/MovieRow";
import SkeletonRow from "../../components/Skeletonrow";
import Footer from "../../components/Footer";
import {
  useGetTrendingQuery,
  useGetTopRatedQuery,
  useGetByGenreQuery,
  
} from "../../services/moviesApi";
import ChatGptModel from "../../components/ChatGptModel";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";

const Home = () => {
  const { data: trending, isLoading: trendingLoading } = useGetTrendingQuery();
  const { data: topRated, isLoading: topLoading } = useGetTopRatedQuery();
  const chatGptMode = useSelector((state) => state.chatGpt.mode);
  const { data: action, isLoading: actionLoading } = useGetByGenreQuery(28);
  const { data: comedy, isLoading: comedyLoading } = useGetByGenreQuery(35);
  const { data: horror, isLoading: horrorLoading } = useGetByGenreQuery(27);
  const aiMovies = useSelector((state) => state.chatGptReply.OutputItems);
  console.log("AI Recommended Movies:", aiMovies);
  const isLoading =
    trendingLoading ||
    topLoading ||
    actionLoading ||
    comedyLoading ||
    horrorLoading;

    
  return (
    <div className="mb-[-100px] bg-black text-white min-h-screen pt-10">
    
     <Navbar />

{chatGptMode === "chat" && <ChatGptModel />}

{chatGptMode !== "chat" && <TvShowHero />}
    

      

      {/* ✅ SAME OVERLAP DESIGN */}
      <div className=" relative z-20 px-6 space-y-8">
        {isLoading ? (
          [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
        ) : (
          <div className="relative z-20 px-6 space-y-8">
  <MovieRow title="AI Recommended" movies={aiMovies || []} />
  <MovieRow title="Trending Now" movies={trending?.results} />
  <MovieRow title="Top Rated" movies={topRated?.results} />
  <MovieRow title="Action Movies" movies={action?.results} />
  <MovieRow title="Comedy" movies={comedy?.results} />
  <MovieRow title="Horror" movies={horror?.results} />
</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
