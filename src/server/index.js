import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
// import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { refreshTokens } from './utilities/auth';
import models from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(cors('*'));
app.use(express.static(path.join(__dirname, '/public')));
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'index.html'));
});

const SECRET = 'adasdjaisoda7s89p';
const SECRET2 = 'asdjrfj8934rjr49';

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};


app.use(addUser);

// bodyParser is needed just for POST.
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
      user: req.user,
      SECRET,
      SECRET2,
    },
  })),
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const server = createServer(app);

models.sequelize.sync().then(() => {
  server.listen(3000, () => {
    // eslint-disable-next-line no-new
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
      onConnect: async ({ token, refreshToken }) => {
        if (token && refreshToken) {
          try {
            const { user } = jwt.verify(token, SECRET);
            return { models, user };
          } catch (err) {
            const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
            return { models, user: newTokens.user };
          }
        //   const member = await models.Member.findOne({ where: { teamId: 1, userId: user.id } });
        //   if (!member) throw new Error('Missing auth tokens');
        }
        return { models };
      },
    }, {
      server,
      path: '/subscriptions',
    });
  });
});

