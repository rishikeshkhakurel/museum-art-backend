const mongoose = require("mongoose");

const artWorkSchema = new mongoose.Schema({
	Title: {
		type: String,
		required: true,
	},
	URL: {
		type: String,
		required: true,
	},
	ThumbnailURL: {
		type: String,
		required: true,
	},
	Date: {
		type: Number,
		required: false,
	},
}, { timestamps: true });

const ArtWork = mongoose.model("artWork", artWorkSchema);
module.exports = ArtWork;
