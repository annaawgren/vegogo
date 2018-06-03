import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  "mongodb://localhost/8080",
  { useMongoClient: true }
);
mongoose.Promise = Promise;

mongoose.connection.on("error", err => console.error("Connection error:", err));
mongoose.connection.once("open", () => console.log("Connected to mongodb"));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(8080, () => console.log("Example app listening on port 8080!"));
