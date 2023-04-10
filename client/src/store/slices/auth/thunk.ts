import {onSignUp} from "./authSlice";
import {axiosApi} from '../../../config/axiosApi';
import {AppDispatch} from "../../store";

export const onLogin = (username: string, password: string): any =>
    async (dispatch: AppDispatch) => {
        axiosApi.post('/user/login', {
            username,
            password
        }).then(({data}) => {
            dispatch(onSignUp({statusAuth: data.status, username: username}));
        }).catch(error => {
            throw new Error(`Error at log in, ${error}`)
        });
    };
