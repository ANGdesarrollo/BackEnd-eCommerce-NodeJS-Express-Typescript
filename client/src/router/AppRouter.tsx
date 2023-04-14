import {Navigate, Route, Routes} from "react-router-dom";
import {PublicRoutes} from "./publicRoutes/PublicRoutes";
import {Login} from "../auth/login/Login";
import {PrivateRoutes} from "./privateRoutes/PrivateRoutes";
import {ChatContainer} from "../pages/chat/ChatContainer";
import {ProductsContainer} from "../pages/products/ProductsContainer";
import {CheckerAuth} from "../utils/CheckerAuth";
import {authSession} from "../store/slices/auth/thunk";
import {useAppDispatch} from "../hooks/useRedux";
import {CheckerRoutes} from "./checkerRoutes/CheckerRoutes";
import {useEffect} from "react";
import {RegisterContainer} from "../auth/register/RegisterContainer";

export const AppRouter = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authSession());
    }, []);


    return (
        <Routes>
            <Route element={<CheckerRoutes/>}>
                <Route path="/checkerAuth" element={<CheckerAuth/>}></Route>
            </Route>
            <Route element={<PublicRoutes/>}>
                <Route path="/register" element={<RegisterContainer/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/*" element={<Navigate to="/register"/>}></Route>
            </Route>
            <Route element={<PrivateRoutes/>}>
                <Route path="/dashboard/products" element={<ProductsContainer/>}></Route>
                <Route path="/dashboard/chat" element={<ChatContainer/>}></Route>
                <Route path="/dashboard/*" element={<Navigate to="/dashboard/products"/>}></Route>
            </Route>
        </Routes>
    );
};
