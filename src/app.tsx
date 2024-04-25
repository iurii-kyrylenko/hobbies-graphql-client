import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import apolloClient from "./apollo-client";
import router from "./router";
import store from "./store";

const App = () => (
    <ApolloProvider client={apolloClient}>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </ApolloProvider>
);

export default App;
