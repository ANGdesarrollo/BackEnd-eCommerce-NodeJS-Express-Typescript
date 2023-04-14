export interface AuthState {
    isLogged: boolean;
    isRegistered: boolean
    username: string | null;
    loading: boolean;
    checkSessionAuth: boolean;
    isAdmin: boolean;
}
