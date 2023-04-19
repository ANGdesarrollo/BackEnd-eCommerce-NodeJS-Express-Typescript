import {register} from "../../store/slices/auth/thunk";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {RegisterLayout} from "./RegisterLayout";

export const RegisterContainer = () => {
    const [ comparePasswords, setComparePasswords ] = useState(false);
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

        if(dataUser.password === dataUser.repeatPassword) {
            dispatch(register(dataUser))
        } else {
            setComparePasswords(true);
        }

    };

    useEffect(() => {
        if(isRegistered) {
            navigate('/login');
        }
    }, [isRegistered]);


    return (
        <RegisterLayout handleSubmit={handleSubmit} loading={loading} comparePasswords={comparePasswords}/>
    );
}

