import express from "express";

const app = express();

const handleServerOpen = () => console.log("SERVER OPEN 👾");

app.listen(4000, handleServerOpen);

app.get("/", () => console.log("Hello"));
