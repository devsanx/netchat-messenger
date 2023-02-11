import * as Mui from "@mui/material";
import { useContext, useRef } from "react";
import { SocketContext, ContactContext } from "src/contexts";

export const Intro = () => {
  const contacts = useContext(ContactContext);
  const socket = useContext(SocketContext);
  const inputRef = useRef(document.createElement("input"));

  const handleClick = () => {
    const name = inputRef.current?.value;
    if (name.length > 2) {
      contacts?.setUserName(name);
      socket.emit("Event:RegisterUser", name);
    }
  };

  return (
    <Mui.Stack
      alignItems="center"
      spacing={2}
      justifyContent="center"
      flexGrow={1}
    >
      {contacts?.username === "" ? (
        <>
          <Mui.Typography variant="h3">Welcome To NetChat</Mui.Typography>
          <Mui.TextField
            inputRef={inputRef}
            fullWidth
            sx={{ maxWidth: 400 }}
            placeholder="Enter Your Name"
          />
          <Mui.Button
            variant="contained"
            fullWidth
            sx={{ maxWidth: 400 }}
            onClick={handleClick}
          >
            Submit
          </Mui.Button>
        </>
      ) : (
        <>
          <Mui.Typography variant="h3">
            Hello {contacts?.username}
          </Mui.Typography>
          <Mui.Typography variant="h5" my={2}>
            Add some friends and start chatting
          </Mui.Typography>
          <Mui.Typography variant="h5" my={2}>
            Your ID: {socket.id}
          </Mui.Typography>
        </>
      )}
    </Mui.Stack>
  );
};
