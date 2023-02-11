import { io } from "socket.io-client";
import { createContext } from "react";
import { ProviderProps } from "src/ts";
import { SERVER_URL } from "src/constants";

export const Socket = io(SERVER_URL);

export const SocketContext = createContext(Socket);

export const SocketProvider = ({ children }: ProviderProps) => {
  return (
    <SocketContext.Provider value={Socket}>{children}</SocketContext.Provider>
  );
};
