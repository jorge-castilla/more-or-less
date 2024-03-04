const { log } = require("console");

const usersOnRoom = {};

function handleSocketConnection(io, socket) {
  console.log("Un cliente se ha conectado");

  socket.on("joinRoom", (roomId, name, userId) => {
    handleJoinRoom(io, socket, roomId, name, userId);
  });

  socket.on("userReady", (roomId, userId, isReady) => {
    handleUserReady(io, roomId, userId, isReady);
  });

  socket.on("userKick", (roomId, userId) => {
    handleUserKick(io, roomId, userId);
  });

  socket.on("disconnect", () => {
    handleDisconnect(io, socket);
  });
}

function handleJoinRoom(io, socket, roomId, name, userId) {
  if (!usersOnRoom[roomId]) {
    usersOnRoom[roomId] = [];
  }

  const userExisted = usersOnRoom[roomId]?.find((user) => user.id === userId);

  if (userExisted) {
    usersOnRoom[roomId] = usersOnRoom[roomId].map((user) => {
      if (user.id === userId) {
        user.isConnected = true;
        user.socketId = socket.id;
      }
      return user;
    });
  } else {
    usersOnRoom[roomId].push({
      id: userId,
      name: name,
      isConnected: true,
      socketId: socket.id,
      isCreator: usersOnRoom[roomId].length === 0,
      isReady: usersOnRoom[roomId].length === 0,
    });
  }

  socket.join(roomId);
  io.to(roomId).emit("updatedUsers", usersOnRoom[roomId]);
  log("Usuarios en la sala: ", usersOnRoom[roomId]);
}


function handleUserReady(io, roomId, userId, isReady) {
    const user = usersOnRoom[roomId].find((user) => user.id === userId);
    user.isReady = isReady;
    io.to(roomId).emit("updatedUsers", usersOnRoom[roomId]);
}

function handleUserKick(io, roomId, userId) {
  log("Usuario expulsado: ", userId);
  usersOnRoom[roomId] = usersOnRoom[roomId].filter((user) => user.id !== userId);
  io.to(roomId).emit("updatedUsers", usersOnRoom[roomId]);
}
  

function handleDisconnect(io, socket) {
  Object.keys(usersOnRoom).forEach((roomId) => {
    usersOnRoom[roomId] = usersOnRoom[roomId].map((user) => {
      if (user.socketId === socket.id) {
        user.isConnected = false;
      }
      return user;
    });
    io.to(roomId).emit("updatedUsers", usersOnRoom[roomId]);
  });
}

module.exports = {
  handleSocketConnection,
  handleJoinRoom,
  handleDisconnect,
};
