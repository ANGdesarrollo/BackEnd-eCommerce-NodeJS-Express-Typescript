import {Navigate, Outlet} from 'react-router-dom';
import React from "react";
import {useAppSelector} from "../../hooks/useRedux";

export const PrivateRoutes = (): React.ReactElement => {

    const { isLogged, checkSessionAuth } = useAppSelector((state) => state.auth);

    if(!checkSessionAuth) {
        return <Navigate to="/checkerAuth"/>
    } else if (!isLogged) {
        return <Navigate to="/register"/>
    } else {
        return <Outlet/>
    }
};
