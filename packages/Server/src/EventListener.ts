import { Server, Socket } from "socket.io";

const users = [];

const EventListener = (io: Server, socket: Socket) => {
  socket.on("Event:RegisterUser", (userName) => {
    users.push({
      name: userName,
      uuid: socket.id,
      online: true,
      hasUnreadMessages: false,
      isGroup: false,
    });
  });

  socket.on("Event:AddContact", (uuid) => {
    const contact = users.find((user) => user.uuid === uuid);
    if (contact) socket.emit("Event:ContactAdded", contact);
  });

  socket.on("Event:AddGroup", (group) => {
    const groupAdmin = users.find((user) => user.uuid === socket.id);
    io.to(group.members).emit("Event:JoinGroupAck", {
      ...group,
      owner: groupAdmin,
    });
  });

  socket.on("Event:JoinGroupConfirmation", (groupName) => {
    socket.join(groupName);
  });

  socket.on("Event:SendMessage", (payload) => {
    const sendToRoom = payload.room;
    const messageToSend = payload.message;
    const senderContact = users.find((user) => user.uuid === socket.id);

    io.to(sendToRoom).emit("Event:NewMessage", {
      sender: senderContact,
      content: messageToSend,
      roomToReceive: payload.isGroup ? sendToRoom : socket.id,
      isGroup: payload.isGroup,
    });
  });
};

export default EventListener;
