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
const io = new Server(server, {
    connectionStateRecovery: {}
  });

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    socket.on('joinRoom', (roomName, name) => {
        socket.join(roomName);
        const msg = `${name} se ha unido a la sala ${roomName}`
        console.log(msg);
        io.to(roomName).emit('hello', msg); 
    });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor corriendo en el http://localhost:${PORT}`));
