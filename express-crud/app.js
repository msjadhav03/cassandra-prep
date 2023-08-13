const express = require("express");
const bodyParser = require("body-parser");
const cassandra = require("cassandra-driver");

const app = express();
const port = 3000;

// Cassandra client setup
const client = new cassandra.Client({
  contactPoints: ["localhost"], // Change this to your Cassandra cluster's contact points
  localDataCenter: "datacenter1", // Change this to your data center name
  keyspace: "test", // Change this to your keyspace name
});

// Middleware setup
app.use(bodyParser.json());

// Create a new post
app.post("/blog", (req, res) => {
  const { blog_id, title, content, created_at } = req.body;
  const query =
    "INSERT INTO blog (blog_id, title, content, created_at) VALUES (?, ?, ?, ?)";

  client
    .execute(query, [blog_id, title, content, new Date(created_at)], {
      prepare: true,
    })
    .then(() => res.status(201).send("Post created successfully"))
    .catch((err) => res.status(500).send(err.message));
});

// Get all blog
app.get("/blog", (req, res) => {
  const query = "SELECT blog_id, title, content, created_at FROM blog";

  client
    .execute(query)
    .then((result) => res.json(result.rows))
    .catch((err) => res.status(500).send(err.message));
});

// Get a specific post by ID
app.get("/blog/:blog_id", (req, res) => {
  const query =
    "SELECT blog_id, title, content, created_at FROM blog WHERE blog_id = ?";

  client
    .execute(query, [req.params.blog_id], { prepare: true })
    .then((result) => {
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).send("Post not found");
      }
    })
    .catch((err) => res.status(500).send(err.message));
});

// Update a post
app.put("/blog/:blog_id", (req, res) => {
  const { title, content } = req.body;
  const query = "UPDATE blog SET title = ?, content = ? WHERE blog_id = ?";

  client
    .execute(query, [title, content, req.params.blog_id], { prepare: true })
    .then(() => res.send("Post updated successfully"))
    .catch((err) => res.status(500).send(err.message));
});

// Delete a post
app.delete("/blog/:blog_id", (req, res) => {
  const query = "DELETE FROM blog WHERE blog_id = ?";

  client
    .execute(query, [req.params.blog_id], { prepare: true })
    .then(() => res.send("Post deleted successfully"))
    .catch((err) => res.status(500).send(err.message));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
