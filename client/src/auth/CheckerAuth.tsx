import {DotWave} from "@uiball/loaders";
import Container from "@mui/material/Container";
import {containerCheckerAuth} from "./muiStyles";

export const CheckerAuth = () => {
    return (
        <Container sx={containerCheckerAuth}>
            <DotWave size={35} color="#231F20" />
        </Container>
    );
};
