const Artist = require('../models/artist');

const listArtist = async (req, res) => {
	try {
		let { page = 1 } = req.query;
		const pageSize = 100;
		const skipCount = (page - 1) * pageSize;
		Artist.find().skip(skipCount).limit(pageSize)
			.then((result) => {
				res.status(200).send(result)
			})
	} catch (error) {
		console.error(error);
		res.status(400).send({ error: "Something went wrong report to admin or try again after few min" });
	}
};

const searchArtist = async (req, res) => {
	try {
		const { query } = req.query;
		//   const query="Robert"
		const searchResults = await Artist.find({ DisplayName: { $regex: query, $options: 'i' }, Nationality: { $regex: query, $options: 'i' } });
		res.status(200).send(searchResults);
	} catch (error) {
		console.error(error);
		res.status(400).send({ error: "Something went wrong. Please report to the admin or try again later." });
	}
};

module.exports = {
	listArtist,
	searchArtist,
};
