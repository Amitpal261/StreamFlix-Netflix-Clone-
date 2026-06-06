import { createBrowserRouter} from "react-router-dom";
import Body from "./components/Body";
import MovieView from "./components/MovieView";
import Login from "./components/Login";
import Home from "./app/pages/home";
import TVShows from "./app/pages/TvShow";
import ChatGptModel from "./components/ChatGptModel";
import DynamicMoviesView from "./components/DynamicMoviesView";

const App = () => {

  return (
    <div className="bg-black ">
      
        <Body />
     
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    errorElement: <Error />,
    children: [
      {
        path: "/",

        element: <Body />,
      },

      {
        path: "/:id",
        element: <MovieView />,
      },
      {
        path : "/login",
        element : <Login/>
      }
    ],
  },
  {
    path: "/:id",
    element: <MovieView />,
  },
    {
    path: "home",
    element: <Home />,
    children : [
      {
        path : "chatgpt",
        element :<ChatGptModel/>
      },
      {
        path : "movies/:id",
        element : <DynamicMoviesView/>
      }
    ]
  },
  {
    path: "tVShows",
    element: <TVShows />,
  },
  {path : "chatgpt",
    element :<ChatGptModel/>
  }
]);

export default App;
