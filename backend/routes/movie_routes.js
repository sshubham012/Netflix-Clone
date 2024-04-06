const express = require("express");
const { getRandMovie } = require("../controllers/movieControllers/getmovies");
const  router = express.Router();

router.get("/getRandMovie", getRandMovie);

module.exports=router;