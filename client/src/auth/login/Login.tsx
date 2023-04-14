import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {containerBox} from "../muiStyles";
import {onLogin} from "../../store/slices/auth/thunk";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {Orbit} from "@uiball/loaders";
import {Link} from "react-router-dom";

export const Login = () => {

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.auth);

    const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataUser = {
            username: String(data.get('username')),
            password: String(data.get('password'))
        }
        dispatch(onLogin(dataUser.username, dataUser.password))
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={containerBox}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
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
                    {!loading ? <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                    </Button>: <Orbit size={35} color="#231F20" />}
                </Box>
                <Box sx={{display: "flex", justifyContent: "flex-start", width: "100%"}}>
                    <Typography >Don't you have an account? Sign up <Link to="/register">here</Link></Typography>
                </Box>
            </Box>
        </Container>
    );
}

