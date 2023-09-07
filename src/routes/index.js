const express = require("express");
const artist = require("../controllers/artist");
const artWork = require("../controllers/art-work");
const router = express.Router();

//routes

//artist
router.get("/artist", artist.listArtist);
router.get("/artist/search", artist.searchArtist);
router.post("/artist/add", artist.addArtist);
router.put("/artist/edit", artist.editArtist);
router.delete("/artist/:artistId", artist.deleteArtist);
router.get("/artist/:artistId", artist.ArtistbyId);

//art work
router.get("/artwork", artWork.listArtWork);
router.get("/artwork/search", artWork.searchArtWork);
router.delete("/artwork/:artWorkId", artWork.deleteArtWork);
router.get("/artwork/:artWorkId", artWork.ArtWorkbyId);

module.exports = router;