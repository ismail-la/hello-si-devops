const express = require("express");
const app = express();

app.get("/health", (req, res) => res.json({ status: "UP" }));

// Add this route for the home page
app.get("/", (req, res) => {
  res.send("Hello, SI DevOps!");
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on ${port}`));
}
module.exports = app;
