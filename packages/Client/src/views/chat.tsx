import * as Mui from "@mui/material";
import { SendMessage } from "src/views";
import { Message } from "src/components";
import * as contexts from "src/contexts";
import { useContext, useEffect } from "react";

export const Chat = () => {
  const chatRoom = useContext(contexts.ChatRoomContext);
  const messages = useContext(contexts.MessagesContext);
  const socket = useContext(contexts.SocketContext);

  useEffect(() => {
    messages?.markAllAsRead(chatRoom?.contact?.uuid || "");
  }, [messages?.messages.length]);

  return (
    <>
      <Mui.Box position="relative" overflow="hidden" flexGrow={1}>
        <Mui.Stack spacing={2} p={3} sx={chatListStyles}>
          {messages?.messages
            .filter((message) => message.room === chatRoom?.contact.uuid)
            .map((message, index) => (
              <Message
                key={index}
                text={message.message}
                owner={message.owner.uuid === socket.id}
                ownerName={message.owner.name}
              />
            ))}
        </Mui.Stack>
      </Mui.Box>
      <Mui.Box>
        <SendMessage />
      </Mui.Box>
    </>
  );
};

const chatListStyles = {
  position: "absolute",
  overflow: "scroll",
  top: 0,
  left: 0,
  right: -15,
  bottom: -15,
};
