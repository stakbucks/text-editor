import mongoose from "mongoose";

const MONGO_DB = "mongodb://127.0.0.1:27017/textEditor";

mongoose.connect(MONGO_DB);

const db = mongoose.connection;

db.on("error", (error) => console.log("DB Error: ", error));
db.once("open", () => console.log("Connected to DB"));
