"use strict";

const express = require("express");
//const app = express();
const router = express.Router();

const Coin = require("../models/coin");

router.route("/").get(
(request, response) =>
{
	/*Coin.find((error, coins) =>
	{
		if (error)
		{
			console.log("%o @ %s", error, new Date().toLocaleString());
		}
		else
		{
			response.render("index", { coins: coins });
		}
	});*/
	//response.render("index");
	Coin.find().then(
	(coins) =>
	{
		console.info("Retrieved %d coins successfully.", coins.length);

		response.render("index", { coins: coins });
	}).catch(
	(error) =>
	{
		console.error("Retrieve request failed. %o", error);
	}).finally(
	() =>
	{
		console.info("Retrieve request complete.\n");
	});
});

router.route("/add").get(
(request, response) =>
{
	response.render("add");
});

router.route("/edit/:id").get(
(request, response) =>
{
	const id = request.params.id;

	/*Coin.findById(id, (error, coin) =>
	{
		response.render("edit", { coin: coin });
	});*/
	Coin.findById(id).then(
	(coin) =>
	{
		console.info("Retrieved coin successfully.\n%s", coin);

		response.render("edit", { coin: coin });
	}).catch(
	(error) =>
	{
		console.error("Retrieve request failed. %o", error);

		response.status(400).send("Retrieved request failed. Request aborted.");
	}).finally(
	() =>
	{
		console.info("Retrieve request complete.\n");
	});
});

router.route("/edit/:id").post(
(request, response) =>
{
	const id = request.params.id;

	Coin.findById(id, (error, coin) =>
	{
		if (error)
		{
			return next(new Error("Coin was not found."));
		}
		else
		{
			coin.name = request.body.name;
			coin.price = request.body.price;
			coin.modified = Date.now();

			coin.save().then(
			(coin) =>
			{
				console.info("Edit request completed successfully.\n%s", coin);

				response.redirect("/coins");
			}).catch(
			(error) =>
			{
				console.error("Edit request failed. %s @ %s", error, new Date().toLocaleTimeString());

				response.status(400).send("Edit request failed. Request aborted.");
			}).finally(
			() =>
			{
				console.info("Edit request complete.\n");
			});
		}
	});
});

router.route("/add").post(
(request, response) =>
{
	const coin = new Coin(request.body);
	coin.epoch = Date.now();
	coin.modified = Date.now();

	coin.save().then(
	(coin) =>
	{
		console.info("Add request was successful.\n%s", coin);

		response.redirect("/coins");
	}).catch(
	(error) =>
	{
		console.error("Add request failed. %s @ %s", error, new Date().toLocaleTimeString());

		response.status(400).send("Add request failed. Request aborted.");
	}).finally(
	() =>
	{
		console.info("Add request complete.\n");
	});
});

router.route("/delete/:id").get(
(request, response) =>
{
	const id = request.params.id;

	/*Coin.findByIdAndDelete(id, (error, coin) =>
	{
		if (error)
		{
			console.error("/delete: %o", error);
		}
		else
		{
			console.info("Deleted coin successfully. %s @ %s.", coin, new Date().toLocaleTimeString());

			response.redirect("/coins");
		}
	});*/
	Coin.findByIdAndDelete(id).then(
	(coin) =>
	{
		console.info("Delete request was successful.\n%s", coin);

		response.redirect("/coins");
	}).catch(
	(error) =>
	{
		console.error("Delete request failed. %s @ %s", error, new Date().toLocaleString());

		response.status(400).send("Delete request failed. Request aborted.");
	}).finally(
	() =>
	{
		console.info("Delete request complete.\n");
	});
});

module.exports = router;