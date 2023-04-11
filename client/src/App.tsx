import {AppRouter} from "./router/AppRouter";
import {Navbar} from "./ui/Navbar";
import {useAppSelector} from "./hooks/useRedux";

export const App = () => {
    const {auth} = useAppSelector(state => state);
    return (
        <>
            {auth.isLogged && <Navbar/>}
            <AppRouter/>
        </>

    );
}

