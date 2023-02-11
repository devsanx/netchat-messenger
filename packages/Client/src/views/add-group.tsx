import * as Mui from "@mui/material";
import { stringAvatar } from "src/utils";
import { contact as contactType } from "src/ts";
import { useContext, useRef, useState } from "react";
import { SocketContext, ContactContext } from "src/contexts";

export const AddGroup = (props: AddGroupProps) => {
  const socket = useContext(SocketContext);
  const contacts = useContext(ContactContext);
  const inputRef = useRef(document.createElement("input"));
  const [members, setMembers] = useState<contactType[]>([]);

  const handleToggle = (contact: contactType) => () => {
    const currentIndex = members.indexOf(contact);
    const newChecked = [...members];
    if (currentIndex === -1) {
      newChecked.push(contact);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setMembers(newChecked);
  };

  const handleCreateGroup = () => {
    if (inputRef.current.value.length > 2) {
      props.onClose();
      socket.emit("Event:AddGroup", {
        name: inputRef.current.value,
        members: [...members.map((member) => member.uuid), socket.id],
      });
      setMembers([]);
    }
  };

  return (
    <Mui.Dialog open={props.open} fullWidth>
      <Mui.DialogTitle>Create A Group</Mui.DialogTitle>
      <Mui.DialogContent dividers={true}>
        <Mui.Stack spacing={2}>
          <Mui.TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group Name"
            type="text"
            fullWidth
            variant="outlined"
            inputRef={inputRef}
          />
          <Mui.Typography>Select Members</Mui.Typography>
          <Mui.List>
            {contacts?.contactsList
              .filter((contact) => !contact.isGroup)
              .map((contact, index) => (
                <Mui.ListItem
                  key={index}
                  secondaryAction={
                    <Mui.Checkbox
                      edge="end"
                      onChange={handleToggle(contact)}
                      checked={members.indexOf(contact) !== -1}
                    />
                  }
                  disablePadding
                >
                  <Mui.ListItemButton>
                    <Mui.ListItemAvatar>
                      <Mui.Avatar {...stringAvatar(contact.name)} />
                    </Mui.ListItemAvatar>
                    <Mui.ListItemText primary={contact.name} />
                  </Mui.ListItemButton>
                </Mui.ListItem>
              ))}
          </Mui.List>
        </Mui.Stack>
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button onClick={props.onClose}>Cancel</Mui.Button>
        <Mui.Button onClick={handleCreateGroup}>Create Group</Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  );
};

interface AddGroupProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}
