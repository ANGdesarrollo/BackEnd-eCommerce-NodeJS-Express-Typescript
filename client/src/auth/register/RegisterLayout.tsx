import Box from "@mui/material/Box";
import {containerBox} from "../muiStyles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Orbit} from "@uiball/loaders";
import Container from "@mui/material/Container";
import {Link} from "react-router-dom";
import {InputProps} from "@mui/material";

interface Props extends InputProps{
    handleSubmit: (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => void;
    loading: boolean;
}

export const RegisterLayout = ({handleSubmit, loading}: Props) => {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={containerBox}
            >
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                    <TextField
                        type="email"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Email Address"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="repeatPassword"
                        label="Repeat Password"
                        type="password"
                        id="repeatPassword"
                        autoComplete="current-password"
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="secretKey"
                        label="Secret Key"
                        type="password"
                        id="secretKey"
                        autoComplete="current-password"
                    />
                    {!loading ? <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button> : <Orbit size={35} color="#231F20"/>}
                </Box>
                <Box sx={{display: "flex", justifyContent: "flex-start", width: "100%"}}>
                    <Typography >Are you already registered? Sign in <Link to="/login">here</Link></Typography>
                </Box>
            </Box>
        </Container>
    );
};
