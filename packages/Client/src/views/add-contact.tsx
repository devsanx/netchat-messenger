import * as Mui from "@mui/material";
import { useContext, useRef } from "react";
import { SocketContext } from "src/contexts";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export const AddContact = () => {
  const socket = useContext(SocketContext);
  const inputRef = useRef(document.createElement("input"));

  const handleClick = () => {
    const uuid = inputRef.current?.value;
    socket.emit("Event:AddContact", uuid);
    inputRef.current.value = "";
  };

  return (
    <Mui.Stack direction="row" spacing={2} p={2} alignItems="center">
      <Mui.TextField fullWidth inputRef={inputRef} />
      <Mui.IconButton onClick={handleClick}>
        <PersonAddIcon color="primary" />
      </Mui.IconButton>
    </Mui.Stack>
  );
};
