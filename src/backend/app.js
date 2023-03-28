const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 4580;
const cors = require("cors");
const knex = require("./database");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);

app.get("/future-meals", async (req, res) => {
  try {  
    let now = new Date();
    let query = knex.from('Meal')
    .select('when')
    .where ('when', '>', now)
    const results = await query
    res.json(results);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/past-meals", async (req, res) => {
  try { 
  let now = new Date();
  let query = knex.from('Meal')
  .select('when')
  .where ('when', '<', now)
  const results = await query
  res.json(results);
} catch (error) {
  res.status(500).send(error);
}
});

app.get("/all-meals", async (req, res) => {
  try { 
  let query = knex.from('Meal')
  .select('id')
  .orderBy('id', 'asc')
  const results = await query
  res.json(results);
} catch (error) {
  res.status(500).send(error);
}
});

app.get("/first-meal", async (req, res) => {
  try { 
  let query = knex.from('Meal')
  .select('id')
  .orderBy('id', 'asc')
  .first()
  const results = await query
  if (results) {
    res.json(results);}
    else { res.status(404).send("Couldn't get first-meal");}
} catch (error) {
  res.status(500).send(error);
}
});

app.get("/last-meal", async (req, res) => {
  try { 
  let query = knex.from('Meal')
  .select('id')
  .orderBy('id', 'desc')
  .first()
  const results = await query
  if (results) {
  res.json(results);}
  else { res.status(404).send("Couldn't get last-meal");}
} catch (error) {
  res.status(500).send(error);
}
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});


module.exports = app;
