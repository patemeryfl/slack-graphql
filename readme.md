# Slack Client
## Built using React / GraphQL

### To Run Locally
1. Install PostGRES.
- [OSX](https://www.postgresql.org/download/macosx/) [Windows](https://www.postgresql.org/download/windows/)
2. Clone repository and use NPM to install required packages.

#### Start The Server
1. Start the PostGRES database.
```pg_ctl -D /usr/local/var/postgres start```
2. Start the Express server
```npm run server```
3. Start the client.
```npm run client```
4. Navigate to localhost:8080
5. Register new accounts and start chatting!

#### Additional Information
GraphiQL is installed and running by default.
- Access it at localhost:3000/graphiql
