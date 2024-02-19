require('module-alias/register');
const gameRoutes = require('@routes/gameRoutes');
const express = require('express');
const cors = require('cors');

const app = express();


const corsOptions = {
    origin: 'http://localhost:5173', // Asegúrate de que esto coincida con el puerto de tu frontend
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('/api/game', gameRoutes);

const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });

    // Aquí puedes manejar eventos específicos del juego
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor corriendo en el http://localhost:${PORT}`));
