import {onAuthSession, onLoading, onLogOut, onSignUp} from "./authSlice";
import {axiosApi} from '../../../config/axiosApi';
import {AppDispatch} from "../../store";
import {swalAlert} from "../../../utils/swalAlert";

export const onLogin = (username: string, password: string): any =>
    async (dispatch: AppDispatch) => {
    dispatch(onLoading(true))
        axiosApi.post('/user/login', {
            username,
            password
        }).then(({data}) => {
            dispatch(onLoading(false))
            dispatch(onSignUp({isLogged: data.status, username: username}));
        }).catch(error => {
            swalAlert({status: 'warning', message: 'Invalid user data'})
            dispatch(onLoading(false));
            throw new Error(`Error at log in, ${error}`)
        });
    };

export const authSession = (): any => async (dispatch: AppDispatch) => {
    axiosApi.get('/user/authSession')
        .then(({data}) => {
            dispatch(onAuthSession({
                checkSessionAuth: true,
                username: data.username,
                isLogged: true
            }))
        })
        .catch(() => {
            dispatch(onAuthSession({
                checkSessionAuth: true,
                username: null,
                isLogged: false
            }))
        })
}

export const logout = (): any => async (dispatch: AppDispatch) => {
    dispatch(onLoading(true));
    axiosApi.delete('/user/logout')
        .then(() => {
            dispatch(onLoading(false));
            dispatch(onLogOut(false));
        })
        .catch(() => {
            swalAlert({status: 'warning', message: 'Logout error'})
            dispatch(onLoading(false));
            dispatch(onLogOut(true));
        })
}
