import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import './index.css'
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n/i18n";





const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <I18nextProvider i18n={i18n}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </I18nextProvider>,
);
