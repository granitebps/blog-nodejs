const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/database");

const app = express();
mongoose.connect(
  db.mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => {
    console.log("Connected to Database");
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routes/post"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
