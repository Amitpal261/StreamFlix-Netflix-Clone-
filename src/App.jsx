import { createBrowserRouter} from "react-router-dom";
import Body from "./components/Body";
import MovieView from "./components/MovieView";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Login from "./components/Login";
import Home from "./app/pages/home";
import TVShows from "./app/pages/TvShow";

const App = () => {

  return (
    <div className="bg-black ">
      <Provider store={store}>
        <Body />
      </Provider>
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
  },
  {
    path: "tVShows",
    element: <TVShows />,
  },
]);

export default App;
