import { useContext } from "react";
import * as Mui from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { ChatRoomContext, SocketContext } from "src/contexts";
import OfflineShareIcon from "@mui/icons-material/OfflineShare";

export const AppBar = () => {
  const chatRoom = useContext(ChatRoomContext);
  const socket = useContext(SocketContext);

  const handleClick = () => {
    navigator.clipboard.writeText(socket.id);
  };

  return (
    <Mui.AppBar position="fixed">
      <Mui.Toolbar>
        <Mui.Tooltip title="copy your chat id">
          <Mui.IconButton onClick={handleClick}>
            <OfflineShareIcon />
          </Mui.IconButton>
        </Mui.Tooltip>
        <Mui.Typography variant="h5" flexGrow={1}>
          NETCHAT
        </Mui.Typography>
        {chatRoom?.contact ? (
          <>
            <Mui.Typography variant="h5" mr={2}>
              {chatRoom?.contact.name}
            </Mui.Typography>
            <CircleIcon
              color={chatRoom?.contact.online ? "success" : "disabled"}
              sx={{ m: 1 }}
            />
            {chatRoom?.contact.online ? (
              <Mui.Typography>Online</Mui.Typography>
            ) : null}
          </>
        ) : null}
      </Mui.Toolbar>
    </Mui.AppBar>
  );
};
