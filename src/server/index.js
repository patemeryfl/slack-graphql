import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import models from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(cors('*'));

const SECRET = 'adasdjaisoda7s89p';
const SECRET2 = 'asdjrfj8934rjr49';

// bodyParser is needed just for POST.
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      models,
      user: {
        id: 1,
      },
      SECRET,
      SECRET2,
    },
  }),
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

models.sequelize.sync().then(() => {
  app.listen(8080);
});

