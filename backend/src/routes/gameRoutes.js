// backend/src/routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Ruta para crear una nueva partida
router.post('/create', gameController.createGame);

// Ruta para unirse a una partida existente
router.post('/join', gameController.joinGame);

module.exports = router;
