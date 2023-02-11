import * as views from "src/views";
import * as Mui from "@mui/material";
import * as contexts from "src/contexts";
import { useContext, useState } from "react";

export const Messaging = () => {
  const chatRoom = useContext(contexts.ChatRoomContext);
  const [groupDialog, setGroupDialog] = useState(false);

  const handleClickOpen = () => {
    setGroupDialog(true);
  };

  const handleClose = () => {
    setGroupDialog(false);
  };

  return (
    <Mui.Grid container pt={8} overflow="hidden" height="100vh">
      <Mui.Grid item xs={12} lg={3} sx={{ boxShadow: "0px 0px 1px" }}>
        <Mui.Stack overflow="hidden" height="100%">
          <Mui.Box position="relative" overflow="hidden" flexGrow={1}>
            <views.Contacts />
          </Mui.Box>
          <Mui.Box>
            <views.AddContact />
          </Mui.Box>
          <Mui.Button sx={{ py: 1 }} onClick={handleClickOpen}>
            Create A Group
          </Mui.Button>
        </Mui.Stack>
        <views.AddGroup
          open={groupDialog}
          onOpen={handleClickOpen}
          onClose={handleClose}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} lg={9}>
        <Mui.Stack overflow="hidden" height="100%">
          {chatRoom?.contact?.uuid ? <views.Chat /> : <views.Intro />}
        </Mui.Stack>
      </Mui.Grid>
    </Mui.Grid>
  );
};
