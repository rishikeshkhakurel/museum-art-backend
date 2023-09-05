const express = require("express");
const artist = require("../controllers/artist");
const router = express.Router();

//routes

router.get("/artist", artist.listArtist);
router.get("/artist/search", artist.searchArtist);
router.post("/artist/add", artist.addArtist);
router.put("/artist/edit", artist.editArtist);
router.delete("/artist/:artistId", artist.deleteArtist);
router.get("/artist/:artistId", artist.ArtistbyId);

module.exports = router;