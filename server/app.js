const express = require("express");
const app = express();
const schema = require("./schema");
const { graphqlHTTP } = require("express-graphql");

// GraphQL orqali serverga muroajat qilish

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(8000, () => {
  console.log("server works good on http://localhost:8000");
});
