// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => res.status(201).json(users))
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => res.status(201).json(user))
    .catch(err => {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    });
});

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  db.insert(newUser)
    .then(user => res.status(201).json(user))
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: "Please provide name and bio for the user." })
    );
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(user => res.status(201).json(user))
    .catch(err => {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    });
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  console.log(req.body);
  db.update(id, updatedUser)
    .then(user => res.status(201).json(user))
    .catch(err => {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    });
});

server.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
