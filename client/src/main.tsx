import ReactDOM from 'react-dom/client';
import {App} from './App';
import './App.scss';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {SocketsProvider} from "./pages/chat/context/socket.context";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <HashRouter>
            <Provider store={store}>
                <SocketsProvider>
                    <App/>
                </SocketsProvider>
            </Provider>
        </HashRouter>
);
