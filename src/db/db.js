const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");
const supabase = require("./supabaseClient");
const express = require('express');
const router = express();
const mockData = require('../MOCK_DATA.json');
var { ruruHTML } = require("ruru/server")
require('dotenv').config();
const postgres = require('postgres');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    first_names: [String]
    last_names: [String]

  }
`);

// The root provides a resolver function for each API endpoint
const rootValue = {
  first_names() {
    return mockData.map(person => person.first_name + ' ' + person.last_name)
  },
  last_names() {
    return mockData.map(person => person.last_name)
  },
};

// Create and use the GraphQL handler.
router.all(
  "/graphql",
  createHandler({
    schema,
    rootValue,
  })
);


router.get("/db", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

module.exports = router;
