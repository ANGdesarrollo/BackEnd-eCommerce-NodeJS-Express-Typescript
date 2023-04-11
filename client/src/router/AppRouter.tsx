import {Navigate, Route, Routes} from "react-router-dom";
import {PublicRoutes} from "./publicRoutes/PublicRoutes";
import {SignIn} from "../auth/SignIn";
import {PrivateRoutes} from "./privateRoutes/PrivateRoutes";
import {Users} from "../pages/users/Users";
import {ProductsContainer} from "../pages/products/ProductsContainer";
import {CheckerAuth} from "../auth/CheckerAuth";
import {authSession} from "../store/slices/auth/thunk";
import {useAppDispatch} from "../hooks/useRedux";
import {CheckerRoutes} from "./checkerRoutes/CheckerRoutes";
import {useEffect} from "react";

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
                <Route path="/login" element={<SignIn/>}></Route>
                <Route path="/*" element={<Navigate to="/login"/>}></Route>
            </Route>
            <Route element={<PrivateRoutes/>}>
                <Route path="/dashboard/products" element={<ProductsContainer/>}></Route>
                <Route path="/dashboard/users" element={<Users/>}></Route>
                <Route path="/dashboard/*" element={<Navigate to="/dashboard/products"/>}></Route>
            </Route>
        </Routes>
    );
};
