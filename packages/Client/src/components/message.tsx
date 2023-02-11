import { styled } from "@mui/system";
import { Stack, Typography } from "@mui/material";

export const Message = (props: MessageProps) => {
  const MessageComponent = styled(Stack)(({ theme }) => ({
    backgroundColor: props.owner
      ? theme.palette.primary.light
      : theme.palette.primary.dark,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    alignSelf: props.owner ? "end" : "start",
  }));

  return (
    <>
      <MessageComponent>
        <Typography fontWeight="bold">
          {props.owner ? "You" : props.ownerName}
        </Typography>
        <Typography>{props.text}</Typography>
      </MessageComponent>
    </>
  );
};

interface MessageProps {
  text: string;
  owner: boolean;
  ownerName: string;
}
