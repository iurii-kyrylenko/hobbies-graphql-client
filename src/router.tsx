import { Route, createRoutesFromElements, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Books from "./pages/books/Books";
import Movies from "./pages/movies/Movies";
import AddBook from "./pages/books/AddBook";
import EditBook from "./pages/books/EditBook";
import ErrorBoundary from "./pages/ErrorBoundary";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" Component={Layout} ErrorBoundary={ErrorBoundary}>
        <Route index Component={Home} />
        <Route path="login" Component={Login} />
        <Route path="books" Component={Books} />
        <Route path="movies" Component={Movies} />
        <Route path="books/new" Component={AddBook} />
        <Route path="books/:id" Component={EditBook} />
        <Route path="movies/new" element={<p>Add movie</p>} />
    </Route>
));

export default router;
