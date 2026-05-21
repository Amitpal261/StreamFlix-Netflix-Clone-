import Header from "./Header";
import {} from "react-router-dom";
import Hero from "./hero";
import Trending from "./Trending";
import Footer from "./Footer";
const Body = () => {
  return (
    <div
      className="h-full"
      style={{
       backgroundImage: `linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.5)),
       url('https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=735&auto=format&fit=crop')`,
        backgroundSize: "cover",
        backgroundPosition: "center", 
      }}
    >
      <Header/>
      <Hero/>
      <Trending/>
      <Footer/>
    </div>
  );
};

export default Body;
