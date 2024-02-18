// backend/src/controllers/gameController.js
exports.createGame = (req, res) => {
    // Lógica para crear una nueva partida
    res.status(200).json({ message: "Partida creada" });
};

exports.joinGame = (req, res) => {
    // Lógica para unirse a una partida existente
    res.status(200).json({ message: "Unido a la partida" });
};
