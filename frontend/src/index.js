import React, { Suspense, StrictMode } from 'react';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {store} from "./redux/store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const loadingMarkup = (
    <div className="py-4 text-center">
        <h3>Loading..</h3>
    </div>
)

function main(){
    root.render(
        // <StrictMode>
            <Suspense fallback={loadingMarkup}>
                <Provider store={store}>
                    <App/>
                    <ToastContainer theme="colored" />
                </Provider>
            </Suspense>
        // </StrictMode>
    );
}

main()
