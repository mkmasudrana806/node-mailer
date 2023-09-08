const express = require("express");
const appRoute = require("./routes/route.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// routes
app.use("/user", appRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
