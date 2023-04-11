import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import './App.scss';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
    </React.StrictMode>,
);
