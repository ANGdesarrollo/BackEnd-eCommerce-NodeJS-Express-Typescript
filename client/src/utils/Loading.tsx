import {DotWave} from "@uiball/loaders";
import {Box} from "@mui/material";

const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    zIndex: 2,
    backgroundColor: 'hsla(0, 0%, 65%, 0.7)',
    position: 'fixed',
    top: 0
}

export const Loading = () => {
    return (
        <Box sx={containerStyles}>
            <DotWave size={80}/>
        </Box>
    );
};
