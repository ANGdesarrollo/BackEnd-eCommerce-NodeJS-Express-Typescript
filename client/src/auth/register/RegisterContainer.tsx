import {register} from "../../store/slices/auth/thunk";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {RegisterLayout} from "./RegisterLayout";

export const RegisterContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, isRegistered } = useAppSelector(state => state.auth);

    const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }): void => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataUser = {
            username: String(data.get('username')),
            password: String(data.get('password')),
            repeatPassword: String(data.get('repeatPassword')),
            secretKey: String(data.get('secretKey')),
        };

        dispatch(register(dataUser));
    };

    useEffect(() => {
        if(isRegistered) {
            navigate('/login');
        }
    }, [isRegistered]);


    return (
        <RegisterLayout handleSubmit={handleSubmit} loading={loading}/>
    );
}

