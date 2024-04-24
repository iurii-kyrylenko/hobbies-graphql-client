import { Route, createRoutesFromElements, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Books from "./pages/Books.tsx";
import Movies from "./pages/Movies.tsx";
import ErrorBoundary from "./pages/ErrorBoundary.tsx";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" Component={Layout} ErrorBoundary={ErrorBoundary}>
      <Route index Component={Home} />
      <Route path="login" Component={Login} />
      <Route path="books" Component={Books} />
      <Route path="movies" Component={Movies} />
  </Route>
));

export default router;
