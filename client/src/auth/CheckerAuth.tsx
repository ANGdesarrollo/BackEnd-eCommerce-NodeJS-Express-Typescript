import {DotWave} from "@uiball/loaders";
import Container from "@mui/material/Container";
import {containerCheckerAuth} from "./muiStyles";
import { useAppSelector} from "../hooks/useRedux";
import {useEffect} from "react";

export const CheckerAuth = () => {
    const { isLogged } = useAppSelector(state => state.auth);

    useEffect(() => {
       console.log(isLogged)
    }, [isLogged]);

    return (
        <Container sx={containerCheckerAuth}>
            <DotWave size={35} color="#231F20" />
        </Container>
    );
};
