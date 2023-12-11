// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
    }
).catch((err) => {
    console.log(err);
    }
);


app.use("/api", routes);
app.get("/", (req, res) => {
    res.send("Hello World!");
    }   
);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
