const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "Secret Date From Users",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(require("./routes/symptom"));
app.use(require("./routes/article"));
app.use(require("./routes/user"));
app.use(require("./routes/appointment"));
const dbo = require("./db/conn");
app.listen(port, async () => {
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
