import React from 'react';
import {useAppSelector} from "../../hooks/useRedux";
import {Navigate, Outlet} from "react-router-dom";

export const CheckerRoutes = (): React.ReactElement => {
    const { auth: { checkSessionAuth, isLogged } } = useAppSelector(state => state);

    if(checkSessionAuth && isLogged) {
        return <Navigate to="/dashboard/products"/>
    } else if (checkSessionAuth && !isLogged) {
        return <Navigate to="/register"/>
    } else {
        return <Outlet/>
    }
};
