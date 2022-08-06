const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 4000;

// process.env.PORT
// process.env.NODE_ENV

// app.use(express.static(path.join(__dirname, "./ client/build")));

//middleware
app.use(cors());
app.use(express.json()); // for parsing application/json requests

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

//ROUTES//

//get all items
app.get("/items", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM items");
    res.json(allItems.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a single item
app.get("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
    res.json(item.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// create an item
app.post("/items", async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    const newItem = await pool.query(
      "INSERT INTO items (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, price, quantity]
    );

    res.json(newItem.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// update an item
app.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params; // this gets the id that you pass in into the url
    const { name, description, price, quantity } = req.body; // we make this the new body
    const updateItem = await pool.query(
      "UPDATE items SET name = $1, description = $2, price = $3, quantity = $4 WHERE id = $5 RETURNING *", // the id that we are passing in here is the id that we want to update
      [name, description, price, quantity, id]
    );
    res.json("todo was updated");
  } catch (err) {
    console.log(err.message);
  }
});

// delete an item
app.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await pool.query("DELETE FROM items WHERE id = $1", [
      id,
    ]);
    res.json("item was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(6000, () => {
  console.log(`Server is running on port 5000`);
});
