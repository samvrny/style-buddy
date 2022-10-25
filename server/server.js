//import the required packages and files
const express = require('express');
const { authMiddleware } = require('./utils/auth');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');

//require the connection to the mongo database and set up the port
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;

//initiate the ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

//set up express
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//serve static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//start up the apollo server with the graphQL schema
const runApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`GraphQL server running at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
}

//call to start the apollo server with graphQL schema
runApolloServer(typeDefs, resolvers);