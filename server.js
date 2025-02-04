const express = require("express");
const jsonServer = require("json-server");
const app = express();
const port = 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies

// Store the single record
let record = {
  word: "example", // initial word
  clue: "This is a sample clue.", // initial clue
};

// CRUD Routes for the single record

// Read the record
app.get("/api/record", (req, res) => {
  res.json(record); // Return the single record
});

// Create or Update the record
app.post("/api/record", (req, res) => {
  const { word, clue } = req.body;

  // Check if both fields are provided
  if (!word || !clue) {
    return res
      .status(400)
      .json({ error: 'Both "word" and "clue" are required' });
  }

  // Update the record with the new values
  record = { word, clue };
  res.status(200).json(record); // Respond with the updated record
});

// Delete the record
app.delete("/api/record", (req, res) => {
  record = { word: "", clue: "" }; // Reset to empty values
  res.status(204).send(); // No content
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
