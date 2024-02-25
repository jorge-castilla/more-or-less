require("module-alias/register");
const gameRoutes = require("@routes/gameRoutes");
const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Asegúrate de que esto coincida con el puerto de tu frontend
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api/game", gameRoutes);

const http = require("http");
const { Server } = require("socket.io");
const { log } = require("console");
const server = http.createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

const usersOnRoom = {};
io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
  socket.on("joinRoom", (roomId, name, userId) => {
    
    if (!usersOnRoom[roomId]) {
      usersOnRoom[roomId] = [];
    }

    const userExisted = usersOnRoom[roomId]?.find((user) => user.id === userId);

    if (userExisted) {
      usersOnRoom[roomId] = usersOnRoom[roomId].map((user) => {
        if (user.id === userId) {
          user.isConnected = true;
        }
        return user;
      });
    } else {
      usersOnRoom[roomId].push({
        id: userId,
        name: name,
        isConnected: true,
      });
    }

    socket.join(roomId);



    // Emitir evento actualizado con la lista de usuarios a todos los clientes en la sala
    //updatedUsers
    io.to(roomId).emit("updatedUsers", usersOnRoom[roomId]);

    log("Usuarios en la sala: ", usersOnRoom[roomId]);

    socket.on("disconnect", () => {
      usersOnRoom[roomId] = usersOnRoom[roomId].map((user) => {
        if (user.id === userId) {
          user.isConnected = false;
        }
        return user;
      });
      io.to(roomId).emit("updatedUsers", usersOnRoom[roomId]);
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Servidor corriendo en el http://localhost:${PORT}`)
);
