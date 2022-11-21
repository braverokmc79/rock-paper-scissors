"use strict";
const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/users/login", ctrl.output.login);
router.get("/users/join", ctrl.output.register);
router.get("/logout", ctrl.output.logout);

router.get("/game/game", ctrl.output.game);
router.get("/game/paper", ctrl.output.gamePaper);
router.get("/game/rock", ctrl.output.gameRock);
router.get("/game/scissors", ctrl.output.gameScissors);


router.get("/game/game-ranking", ctrl.output.gameRanking);
router.get("/game/game-history", ctrl.output.gameHistory);


//post
router.post("/users/login", ctrl.process.login);
router.post("/users/register", ctrl.process.register);







module.exports = router;

