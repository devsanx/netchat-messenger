import { contact } from "src/ts";
import { useContext } from "react";
import { styled } from "@mui/system";
import * as Mui from "@mui/material";
import * as contexts from "src/contexts";
import { stringAvatar } from "src/utils";
import MailIcon from "@mui/icons-material/Mail";

export const ContactCard = (props: ContactCardProps) => {
  const chatRoom = useContext(contexts.ChatRoomContext);
  const contacts = useContext(contexts.ContactContext);
  const messages = useContext(contexts.MessagesContext);

  const ContactContainer = styled(Mui.Box)(({ theme }) => ({
    "&:hover": { background: theme.palette.secondary.light },
  }));

  const handleClick = () => {
    const currentContact = contacts?.contactsList.find(
      (contact) => contact.uuid === props.contact.uuid
    );
    chatRoom?.setChatRoom(currentContact);
    messages?.markAllAsRead(props.contact.uuid);
  };

  const unReadMessages =
    messages?.messages.filter(
      (message) => message.unread && message.room === props.contact.uuid
    ) || [];

  return (
    <ContactContainer onClick={handleClick}>
      <Mui.Stack direction="row" spacing={2} alignItems="center" p={1} pr={3}>
        <Mui.Avatar {...stringAvatar(props.contact.name)} />
        <Mui.Typography flexGrow={1}>{props.contact.name}</Mui.Typography>
        {unReadMessages.length > 0 ? (
          <Mui.Badge badgeContent={unReadMessages.length} color="primary">
            <MailIcon color="action" />
          </Mui.Badge>
        ) : null}
      </Mui.Stack>
    </ContactContainer>
  );
};

interface ContactCardProps {
  contact: contact;
}
