import {Navigate, Route, Routes} from "react-router-dom";
import {PublicRoutes} from "./publicRoutes/PublicRoutes";
import {SignIn} from "../auth/SignIn";
import {PrivateRoutes} from "./privateRoutes/PrivateRoutes";
import {Users} from "../pages/users/Users";
import {ProductsContainer} from "../pages/products/ProductsContainer";

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PublicRoutes/>}>
                <Route path="/auth" element={<SignIn/>}></Route>
                <Route path="/*" element={<Navigate to="/auth"/>}></Route>
            </Route>
            <Route element={<PrivateRoutes/>}>
                <Route path="/dashboard/products" element={<ProductsContainer/>}></Route>
                <Route path="/dashboard/users" element={<Users/>}></Route>
            </Route>
        </Routes>
    );
};
