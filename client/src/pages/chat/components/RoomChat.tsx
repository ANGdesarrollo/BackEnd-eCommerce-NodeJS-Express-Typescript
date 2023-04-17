import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {Close, Send} from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import {IChat} from "../../../interfaces/interfaceChats";
import {
    ButtonSendStyles,
    ChatMessagesStyles,
    ChatSendMessagesStyles,
    CloseButtonBoxStyles,
    RoomChatContainerStyles,
    RoomChatSubContainerStyles
} from "../muiStyles";
import {Messages} from "./Messages";
import TextField from "@mui/material/TextField";

interface Props {
    informationRoom: IChat | undefined;
    handleRoom: () => void;
    handleSubmit: (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => void;
}

export const RoomChat = ({informationRoom, handleRoom, handleSubmit}: Props) => {

    return (
        <Box sx={RoomChatContainerStyles}>
            <Container sx={RoomChatSubContainerStyles}>
                <Box sx={CloseButtonBoxStyles}>
                    <IconButton onClick={handleRoom}>
                        <Close/>
                    </IconButton>
                </Box>
                <Box sx={ChatMessagesStyles}>
                    {informationRoom && informationRoom.message.map(({created_at, username, message, _id}) => {
                        return (<Messages key={_id} date={created_at} username={username} message={message}/>)
                    })}
                </Box>
                <Box component="form" onSubmit={handleSubmit} sx={ChatSendMessagesStyles}>
                    <TextField
                        name="message"
                        id="message"
                        required
                        label="Enter your message"
                        sx={{height: '100%'}}
                        fullWidth={true}
                    />
                    <IconButton type="submit" sx={ButtonSendStyles}><Send/></IconButton>
                </Box>
            </Container>
        </Box>
    );
};
