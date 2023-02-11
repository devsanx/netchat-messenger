import * as contexts from "src/contexts";
import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { message, ProviderProps, messagesContext } from "src/ts";

export const MessagesContext = createContext<messagesContext | undefined>(
  undefined
);

export const MessagesProvider = ({ children }: ProviderProps) => {
  const [messages, setMessages] = useState<message[]>([]);
  const [notificationRequested, setNotificationRequested] = useState(false);
  const [notificationPermission, setNotificationPermission] =
    useState("denied");

  const socket = useContext(contexts.SocketContext);
  const contacts = useContext(contexts.ContactContext);
  const chatRoom = useContext(contexts.ChatRoomContext);

  useEffect(() => {
    socket.on("Event:NewMessage", (incomingMessage) => {
      const senderId = incomingMessage.sender.uuid;
      if (senderId !== socket.id) {
        notifyUser({
          title: `New Message From ${incomingMessage.sender.name}`,
          body: incomingMessage.content,
        });

        const activeRoom = chatRoom?.contact?.uuid;
        handleCacheMessage({
          room: incomingMessage.roomToReceive,
          owner: { name: incomingMessage.sender.name, uuid: senderId },
          message: incomingMessage.content,
          unread: activeRoom === incomingMessage.roomToReceive ? false : true,
        });

        if (!incomingMessage.isGroup) {
          const inContacts = contacts?.contactsList.find(
            (contact) => contact.uuid === senderId
          );
          if (!inContacts) socket.emit("Event:AddContact", senderId);
        }
      }
    });

    return () => {
      socket.off("Event:NewMessage");
    };
  });

  const notifyUser = (notification: notificationProps) => {
    if (!notificationRequested) {
      Notification.requestPermission().then((permission) => {
        setNotificationRequested(true);
        setNotificationPermission(permission);
      });
    }
    if (notificationRequested && notificationPermission === "granted")
      new Notification(notification.title, {
        body: notification.body || "",
      });
  };

  const handleCacheMessage = (message: message) => {
    setMessages((prevState) => {
      return [...prevState, message];
    });
  };

  const handleMarkAllAsRead = (room: string) => {
    let messagesToUpdate = messages;
    messagesToUpdate.forEach((message) => {
      if (message.unread && message.room === room) message.unread = false;
    });
    setMessages(messagesToUpdate);
  };

  const contextValue = {
    messages: messages,
    cacheMessage: handleCacheMessage,
    markAllAsRead: handleMarkAllAsRead,
  };

  return (
    <MessagesContext.Provider value={contextValue}>
      {children}
    </MessagesContext.Provider>
  );
};

interface notificationProps {
  title: string;
  body?: string;
}
