const express = require("express");
const artist = require("../controllers/artist");
const router = express.Router();

//routes

router.get("/artist", artist.listArtist);
router.get("/artist/search", artist.searchArtist);

module.exports = router;