const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Coin = new Schema({
	name: {
		type: String
	},
	price: {
		type: Number
	},
	epoch: {
		type: Date
	},
	modified:
	{
		type: Date
	}
}, {
	collesion: "Coins"
});

module.exports = mongoose.model("Coin", Coin);