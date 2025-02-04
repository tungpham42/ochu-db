let record = {
  word: "example", // initial word
  clue: "This is a sample clue.", // initial clue
};

module.exports = (req, res) => {
  if (req.method === "GET") {
    return res.json(record); // Return the single record
  }

  if (req.method === "POST") {
    const { word, clue } = req.body;

    if (!word || !clue) {
      return res
        .status(400)
        .json({ error: 'Both "word" and "clue" are required' });
    }

    record = { word, clue };
    return res.status(200).json(record); // Respond with the updated record
  }

  if (req.method === "DELETE") {
    record = { word: "", clue: "" }; // Reset to empty values
    return res.status(204).send(); // No content
  }

  return res.status(405).json({ error: "Method Not Allowed" });
};
