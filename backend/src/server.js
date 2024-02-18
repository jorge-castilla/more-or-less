// backend/src/server.js
require('module-alias/register');
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const gameRoutes = require('@routes/gameRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

app.use('/api/game', gameRoutes);

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });

    // Aquí puedes manejar eventos específicos del juego
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
