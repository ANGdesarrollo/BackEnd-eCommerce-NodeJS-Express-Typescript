import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
interface Props  {
    date: string;
    username: string;
    message: string;
}
export const Messages = ({date, username, message}: Props) => {
    return (
        <Box sx={{display: 'flex', padding:'.2em', alignItems: 'center'}}>
            <Typography sx={{padding: '.1em', color: '#1976d2'}}>[{date}]</Typography>
            <Typography sx={{padding: '.1em'}}>{username}:</Typography>
            <Typography sx={{padding: '.1em'}}>{message}</Typography>
        </Box>
    );
};
