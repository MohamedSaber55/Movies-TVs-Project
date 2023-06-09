import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.css';
import './index.scss';
import AuthContextProvider from './Context/AuthContext';
import TrendingMediaContextProvider from './Context/TrendingMediaContext';
import FavContextProvider from './Context/FavContext';
// import MoviesContextProvider from './Context/MoviesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <FavContextProvider>
                <TrendingMediaContextProvider>
                    {/* <MoviesContextProvider> */}
                        <App />
                    {/* </MoviesContextProvider> */}
                </TrendingMediaContextProvider>
            </FavContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
