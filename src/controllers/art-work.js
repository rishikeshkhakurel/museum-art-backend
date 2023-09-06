const ArtWork = require("../models/art-work");

//get art work
const listArtWork = (req, res) => {
	let { page = 1 } = req.query;
	const pageSize = 100;
	const skipCount = (page - 1) * pageSize;
	ArtWork.find().skip(skipCount).limit(pageSize)
		.then((result) => {
            console.log(result)
			res.status(200).send(result)
		})
		.catch((error) => {
			console.error(error);
			res.status(408).send({ error: "Something went wrong report to admin or try again after few min" });
		})
};

//Search by Title
const searchArtWork = (req, res) => {
	const { query = '', page = 1 } = req.query;
	const pageSize = 100;
	const skipCount = (page - 1) * pageSize;
	ArtWork.find({ Title: { $regex: query, $options: 'i' } }).skip(skipCount).limit(pageSize)
		.then((searchResults) => { res.status(200).send(searchResults) })
		.catch((error) => {
			console.error(error);
			res.status(408).send({ error: "Something went wrong. Please report to the admin or try again later." });
		})
}

module.exports = {
	listArtWork,
    searchArtWork
};