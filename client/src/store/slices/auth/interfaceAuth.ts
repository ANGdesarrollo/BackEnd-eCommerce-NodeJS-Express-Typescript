export interface AuthState {
    isLogged: false;
    username: string | null;
    loading: boolean;
    checkSessionAuth: boolean;
}
