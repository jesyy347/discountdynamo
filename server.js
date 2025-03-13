const express = require("express");
const app = express();
const config = require("./config");

app.get("/", (req, res) => {
  res.send(`Welcome to ${config.appName} - Version ${config.version}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`${config.appName} is running on port ${PORT}`);
});
