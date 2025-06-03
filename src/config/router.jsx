import {
  createBrowserRouter,
} from "react-router";

import HomePage from "../screens/HomePage";
import LoginPage from "../screens/LoginPage";
import PokemonPage from "../screens/PokemonPage";
import Layout from "../components/Layout";
import PokemonDetailPage from "../screens/PokemonDetailPage";
import ProtectedRoutes from "../components/ProtectedRoutes";

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
    Component: ProtectedRoutes,
    children: [{
      path: "/pokemon",
      Component: PokemonPage,
    },
    {
      path: "/pokemon/:id",
      Component: PokemonDetailPage,
    }]
  },


]



);




export default router;