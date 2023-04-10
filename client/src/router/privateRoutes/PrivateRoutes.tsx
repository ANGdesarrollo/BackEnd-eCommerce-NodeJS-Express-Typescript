import {Navigate, Outlet} from 'react-router-dom';
import React from "react";
import {useAppSelector} from "../../hooks/useRedux";

export const PrivateRoutes = (): React.ReactElement | null => {

    const { auth } = useAppSelector((state) => state);
    const { statusAuth } = auth;

    if(statusAuth) {
        return <Outlet/>
    } else {
        return <Navigate to="/login"/>
    }
};
