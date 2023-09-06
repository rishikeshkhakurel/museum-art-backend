const Artist = require('../models/artist');

const listArtist = (req, res) => {
	let { page = 1 } = req.query;
	const pageSize = 100;
	const skipCount = (page - 1) * pageSize;
	Artist.find().skip(skipCount).limit(pageSize)
		.then((result) => {
			res.status(200).send(result)
		})
		.catch((error) => {
			console.error(error);
			res.status(408).send({ error: "Something went wrong report to admin or try again after few min" });
		})
};

//Search by Display Name
const searchArtist = (req, res) => {
	const { query = '', page = 1 } = req.query;
	const pageSize = 100;
	const skipCount = (page - 1) * pageSize;
	Artist.find({ DisplayName: { $regex: query, $options: 'i' } }).skip(skipCount).limit(pageSize)
		.then((searchResults) => { res.status(200).send(searchResults) })
		.catch((error) => {
			console.error(error);
			res.status(408).send({ error: "Something went wrong. Please report to the admin or try again later." });
		})
}

const addArtist = async (req, res) => {
	const { displayName, artistBio, nationality, gender, beginDate, endDate = "" } = req.body
	if (!displayName || !artistBio || !nationality || !gender || !beginDate) {
		res.status(400).send({ error: "Please fill all the requird fields." })
	}
	try {
		const highestConstituentID = await Artist
			.findOne({}, {}, { sort: { ConstituentID: -1 } })
			.select('ConstituentID');

		Artist.create({
			ConstituentID: highestConstituentID ? highestConstituentID?.ConstituentID + 1 : 1,
			DisplayName: displayName,
			ArtistBio: artistBio,
			Nationality: nationality,
			Gender: gender,
			BeginDate: beginDate,
			EndDate: endDate
		})
			.then(() => {
				res.status(200).send({ message: "Artist added successfully." })
			})
			.catch((err) => {
				console.log(err)
				res.status(408).send({ message: "Something went wrong." })
			})

		// if anyfilters? insert here.

	} catch (error) {
		console.error(error)
		res.status(408).send({ error: "Something went wrong. Please report to the admin or try again later." })
	}
}

const editArtist = async (req, res) => {
	const { _id, displayName, artistBio, nationality, gender, beginDate, endDate } = req.body
	if (!_id) {
		res.status(400).send({ error: "Please provide id to the Artist." })
	}
	const newArtist = {};
	displayName & (newArtist.Displayname = displayName)
	artistBio & (newArtist.ArtistBio = artistBio)
	nationality & (newArtist.Nationality = nationality)
	gender & (newArtist.Gender = gender)
	beginDate & (newArtist.BeginDate = beginDate)
	endDate & (newArtist.EndDate = endDate)
	try {
		const updatedArtist = await Artist.findByIdAndUpdate(
			{ _id },
			newArtist
		);

		if (updatedArtist) {
			res.status(200).send({ message: "Artist updated successfully." });
		} else {
			res.status(404).send({ error: "Artist not found." });
		}

	} catch (error) {
		console.error(error)
		res.status(408).send({ error: "Something went wrong. Please report to the admin or try again later." })
	}
}

const deleteArtist = async (req, res) => {
	const { artistId } = req.params;
	if (!artistId) {
		res.status(400).send({ error: "Please provide id to the artist." })
	}
	try {
		const deletedArtist = Artist.findByIdAndDelete(artistId)
			.then(()=>{
				return res.json({ message: 'Artist deleted successfully' });
			})
			.catch((err)=>{
				return res.status(404).json({ message: 'Artist not found' });
			})
		
	} catch (error) {
		console.error(error)
		res.status(408).send({ error: "Something went wrong. Please report to the admin or try again later." })
	}
}

const ArtistbyId = async (req, res) => {
	const { artistId } = req.params;
	try {
		const artist = await Artist.findById(artistId);
		if (!artist) {
			return res.status(404).json({ message: 'Artist not found' });
		}
		return res.json(artist);
	} catch (error) {
		console.error(error)
		res.status(408).send({ error: "Something went wrong. Please report to the admin or try again later." })
	}
}

module.exports = {
	listArtist,
	searchArtist,
	addArtist,
	editArtist,
	deleteArtist,
	ArtistbyId
};
