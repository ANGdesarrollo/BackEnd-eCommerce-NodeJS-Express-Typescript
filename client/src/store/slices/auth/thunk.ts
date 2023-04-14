import {onAuthSession, onLoading, onLogOut, onRegister, onSignUp} from "./authSlice";
import {axiosApi} from '../../../config/axiosApi';
import {AppDispatch} from "../../store";
import {swalAlert} from "../../../utils/swalAlert";
import {IUser} from "../../../interfaces/interfaceUser";

export const onLogin = (username: string, password: string): any =>
    async (dispatch: AppDispatch) => {
    dispatch(onLoading(true))
        axiosApi.post('/user/login', {
            username,
            password
        }).then(({data}) => {
            dispatch(onLoading(false))
            dispatch(onSignUp({isLogged: data.status, username: username, isAdmin: data.isAdmin}));
        }).catch(error => {
            swalAlert({status: 'warning', message: 'Invalid user data'})
            dispatch(onLoading(false));
            throw new Error(`Error at log in, ${error}`)
        });
    };

export const authSession = (): any => async (dispatch: AppDispatch) => {
    axiosApi.get('/user/authSession')
        .then(({data}) => {
            if(!data.status) {
                dispatch(onAuthSession({
                    checkSessionAuth: true,
                    username: null,
                    isLogged: false
                }))
            } else {
                dispatch(onAuthSession({
                    checkSessionAuth: true,
                    username: data.username,
                    isLogged: true,
                    isAdmin: data.isAdmin,
                }))
            }

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

export const register = (user: IUser) => async (dispatch: AppDispatch) => {
    dispatch(onLoading(true));
    axiosApi.post('/user/register', {
        username: user.username,
        password: user.password,
        secretKey: user.secretKey,
    })
        .then(() => {
            dispatch(onLoading(false));
            dispatch(onRegister(true));
        })
        .catch(() => {
            dispatch(onLoading(false));
            swalAlert({status: 'warning', message: 'RegisterContainer data error'})
        })
}
