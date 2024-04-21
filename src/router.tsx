import { Route, createRoutesFromElements, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Home from "./components/Home.tsx";
import Books from "./components/Books.tsx";
import Movies from "./components/Movies.tsx";
import ErrorPage from "./components/ErrorPage.tsx";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" Component={App} ErrorBoundary={ErrorPage}>
      <Route index Component={Home} />
      <Route path="movies" Component={Movies} />
      <Route path="books" Component={Books} />
  </Route>
));

export default router;
