"use strict";

const express = require("express");
const app = express();

const path = require("path");
const parser = require("body-parser");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/coins", { useNewUrlParser: true }).then(
(connection) =>
{
	console.info("Connect request was successful.");
}).catch(
(error) =>
{
	console.info("Connect request failed: %o @ %s", error, new Date().toLocaleTimeString());
}).finally(
() =>
{
	console.info("Connect request complete.\n");
});

const coin = require("./routes/coins");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// routing
app.use("/coins", coin);

app.get("/", (request, response) =>
{
	console.log("Serving index.html @ %s", new Date().toLocaleString());

	response.sendFile(path.join(__dirname, "public", "/html/index.html"));
});

const port = 3150;

app.listen(port, () =>
{
	console.info("Server is running on port %d @ %s.\n", port, new Date().toLocaleTimeString());
});