import { Route, createRoutesFromElements, createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "./pages/ErrorBoundary";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Books from "./pages/books/Books";
import Movies from "./pages/movies/Movies";
import AddBook from "./pages/books/AddBook";
import EditBook from "./pages/books/EditBook";
import AddMovie from "./pages/movies/AddMovie";
import EditMovie from "./pages/movies/EditMovie";
import People from "./pages/People";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" Component={Layout} ErrorBoundary={ErrorBoundary}>
        <Route index Component={Home} />
        <Route path="people" Component={People} />
        <Route path="login" Component={Login} />
        <Route path="books" Component={Books} />
        <Route path="books/new" Component={AddBook} />
        <Route path="books/:id" Component={EditBook} />
        <Route path="movies" Component={Movies} />
        <Route path="movies/new" Component={AddMovie} />
        <Route path="movies/:id" Component={EditMovie} />
     </Route>
));

export default router;
