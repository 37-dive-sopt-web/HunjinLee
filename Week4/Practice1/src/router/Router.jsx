import { createBrowserRouter } from "react-router";
import PokemonDetail from "../pages/PokemonDetail";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/pokemon/:name",
    Component: PokemonDetail,
  },
]);

export default router;
