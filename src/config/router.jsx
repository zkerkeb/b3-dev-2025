import {
  createBrowserRouter,
} from "react-router";

import HomePage from "../screens/HomePage";
import LoginPage from "../screens/LoginPage"; 
import PokemonPage from "../screens/PokemonPage";
import Layout from "../components/Layout";
import PokemonDetailPage from "../screens/PokemonDetailPage";

let router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  { 
    Component: Layout,
    children: [
    {
      path: "/pokemon",
      Component: PokemonPage,
    },
    {
      path: "/pokemon/:id",
      Component: PokemonDetailPage,
    }
  ]
  }
]
);




export default router;