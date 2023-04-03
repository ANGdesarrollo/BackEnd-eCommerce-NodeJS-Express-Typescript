import {Navigate, Route, Routes} from "react-router-dom";
import {PublicRoutes} from "./publicRoutes/PublicRoutes";
import {SignIn} from "../auth/SignIn";
import {PrivateRoutes} from "./privateRoutes/PrivateRoutes";
import {Products} from "../pages/products/Products";

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PublicRoutes/>}>
                <Route path="/auth" element={<SignIn/>}></Route>
                <Route path="/*" element={<Navigate to="/auth"/>}></Route>
            </Route>
            <Route element={<PrivateRoutes/>}>
                <Route path="/dashboard/products" element={<Products/>}></Route>
            </Route>
        </Routes>
    );
};
