const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }),
});

server.applyMiddleware({ app });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/beanbanter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
});
