import {
  createBrowserRouter,
} from "react-router";

import HomePage from "../screens/HomePage";
import LoginPage from "../screens/LoginPage"; 
import PokemonPage from "../screens/PokemonPage";
import Layout from "../components/Layout";

let router = createBrowserRouter([
  { 
    Component: Layout,
    children: [{
      path: "/",
      Component: HomePage,
    },
    {
      path: "/login",
      Component: LoginPage,
    },
    {
      path: "/pokemon",
      Component: PokemonPage,
    }]
    
  }
]
);

export default router;