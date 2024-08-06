const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.APP_PORT || 7777;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
