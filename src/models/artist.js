const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
	ConstituentID: {
		type: Number,
		required: true,
	},
	DisplayName: {
		type: String,
		required: true,
	},
	ArtistBio: {
		type: String,
		required: true,
	},
	Nationality: {
		type: String,
		required: true,
	},
	Gender: {
		type: String,
		required: false,
	},
	BeginDate: {
		type: Number,
		required: false,
	},
	EndDate: {
		type: Number,
		required: false,
	},
	BeginDate: {
		type: Number,
		required: false,
	},
	BeginDate: {
		type: Number,
		required: false,
	},

}, {timestamps: true});

const Artist = mongoose.model("artists", artistSchema);
module.exports = Artist;
