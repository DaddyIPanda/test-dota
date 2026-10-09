import React from "react";
import ReactDOM from "react-dom/client";
import SearchPlayers from "./pages/search_players";
import Main from "./pages/main";
import HeroStatistics from "./pages/hero_statistics";
import NotFoundPage from "./pages/not_found_page";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/search_players",
    element: <SearchPlayers />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/hero_statistics",
    element: <HeroStatistics />,
    errorElement: <NotFoundPage />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  }
]);

root.render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
