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

//delete Art Work
const deleteArtWork = (req, res) => {
    const { artWorkId } = req.params;
    if (!artWorkId) {
        res.status(400).send({ error: "Please provide id to the artWork." })
    }
    try {
        ArtWork.findByIdAndDelete(artWorkId)
            .then(() => {
                return res.json({ message: 'ArtWork deleted successfully' });
            })
            .catch((err) => {
                return res.status(404).json({ message: 'ArtWork not found' });
            })
    } catch (error) {
        console.error(error)
        res.status(408).send({ error: "Something went wrong. Please report to the admin or try again later." })
    }
}

//ArtWork by Id

const ArtWorkbyId = (req, res) => {
    const { artWorkId } = req.params;
    ArtWork.findById(artWorkId)
        .then((artWork) => {
            if (artWork) {
                return res.status(200).json(artWork);
            } else {
                return res.status(404).json({ message: 'Art Work not found' });
            }
        })
        .catch((error) => {
            console.error(error)
            res.status(408).send({ error: "Something went wrong. Please report to the admin or try again later." })
        })
}

module.exports = {
    listArtWork,
    searchArtWork,
    deleteArtWork,
    ArtWorkbyId
};