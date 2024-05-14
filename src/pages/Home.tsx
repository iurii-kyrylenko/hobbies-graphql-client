import { Box } from "@mui/material";

const Home = () => {
    return (
        <Box className="home" component="main" sx={{ p: 3 }}>
            <p className="description">
                <b>MY HOBBIES </b>is a web application for keeping track of books you have
                read/listened and movies you have watched.
            </p>
            <p>
                After logging in you are able to:
            </p>
            <ul>
                <li>Add an item (book or movie) to the list.</li>
                <li>Modify an existing item.</li>
                <li>Remove an item.</li>
                <li>Perform search for specific item(s).</li>
            </ul>
            <p>
                Also you have the possibilities to:
            </p>
            <ul>
                <li>Perform search for specific item(s).</li>
                <li>Share data with other people.</li>
            </ul>
            <p>
                Unathorized people can see the data shared by another users.
            </p>
            <hr />
            The application uses GraphQL techology and consists of two open-source projects:
            <ul>
                <li>
                    <a href="https://github.com/iurii-kyrylenko/hobbies-graphql" target="_blank">NodeJS Server</a>,
                    based on <a href="https://www.apollographql.com/docs/apollo-server" target="_blank">Apollo Server</a>.
                </li>
                <li>
                    <a href="https://github.com/iurii-kyrylenko/hobbies-graphql-client" target="_blank">ReactJS Client</a>,
                    based on <a href="https://www.apollographql.com/docs/react" target="_blank">Apollo Client</a>.
                </li>
            </ul>
            The project has a long history: The old version was implemented by <a href="https://github.com/iurii-kyrylenko/hobbies" target="_blank">REST API and VueJS</a>.
            <br />
            The old version is still <a href="https://ik-hobbies.onrender.com/" target="_blank">alive</a>. Both new and old versions share the same database.
            <hr />
            Change log:
            <ul>
                <li>
                    May 14, 2024: Deploy new GraphQL projects on <a href="https://render.com/" target="_blank">Render</a>.
                </li>
                <li>
                    Nov 11, 2022: Deploy on <a href="https://render.com/" target="_blank">Render</a> (free hosting plan).
                </li>
                <li>
                    Sep 22, 2020: Migrate database from <a href="https://mlab.com" target="_blank">mLab</a> to <a href="https://www.mongodb.com/cloud/atlas" target="_blank">MongoDB Atlas</a>.
                </li>
                <li>
                    Sep 22, 2020: Migrate database from <a href="https://mlab.com" target="_blank">mLab</a> to <a href="https://www.mongodb.com/cloud/atlas" target="_blank">MongoDB Atlas</a>.
                </li>
                <li>
                    Sep 15, 2019: Handle errors from TMDb API. Update dependencies.
                </li>
                <li>
                    Nov 4, 2018: Filter out people without hobbies.
                </li>
                <li>
                    Nov 3, 2018: Update to latest versions of Vue.js and other libraries.
                </li>
                <li>
                    May 25, 2017: Change movie info service from <a href="http://www.omdbapi.com/" target="_blank">OMDb</a> to <a href="https://www.themoviedb.org/" target="_blank">TMDb</a>.
                </li>
                <li>
                    Apr 24, 2017: Wire up the <a href="http://www.omdbapi.com/" target="_blank">OMDb</a> api service to obtain the movie info.
                </li>
            </ul>
        </Box>
    );
};

export default Home;
