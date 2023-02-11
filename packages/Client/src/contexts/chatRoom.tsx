import { createContext, useState } from "react";
import { contact, ProviderProps, chatRoomContext } from "src/ts";

export const ChatRoomContext = createContext<chatRoomContext | undefined>(
  undefined
);

export const ChatRoomProvider = ({ children }: ProviderProps) => {
  const [chatRoom, setChatRoom] = useState<contact | any>();

  const handleSetChatRoom = (contact: any) => {
    setChatRoom(contact);
  };

  const contextValue = {
    contact: chatRoom,
    setChatRoom: handleSetChatRoom,
  };

  return (
    <ChatRoomContext.Provider value={contextValue}>
      {children}
    </ChatRoomContext.Provider>
  );
};
