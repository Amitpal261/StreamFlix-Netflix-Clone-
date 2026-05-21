import { createBrowserRouter, useNavigate } from "react-router-dom";
import Body from "./components/Body";
import MovieView from "./components/MovieView";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Login from "./components/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

const App = () => {
  const Navigate = useNavigate();
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      Navigate("/profile");
    }
  });

  return () => unsubscribe();
}, []);
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
]);

export default App;
