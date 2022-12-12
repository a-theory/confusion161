import React, { StrictMode } from 'react';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {store} from "./redux/store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

function main(){
    root.render(
        // <StrictMode>
        <Provider store={store}>
            <App/>
            <ToastContainer theme="colored" />
        </Provider>
        // </StrictMode>
    );
}

main()
