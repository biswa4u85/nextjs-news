import Head from 'next/head'
import Layouts from "./Layouts";
import 'antd/dist/antd.css';
import '../assets/css/plugin.min.css';
import '../assets/css/components.css';
import '../assets/css/style.css';
import '../assets/css/live.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from "../i18n";
import { I18nextProvider } from "react-i18next";
import { store } from '../store';
import { Provider } from 'react-redux';
import { saveState } from "../utility/browser-storage";
import { debounce } from "debounce";

export default function App({ Component, pageProps }) {

    store.subscribe(
        debounce(() => {
            saveState('redux', store.getState());
        }, 800)
    );

    return (
        <>
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <ToastContainer />
                    <Layouts>
                        <Component {...pageProps} />
                    </Layouts>
                </I18nextProvider>
            </Provider>
        </>
    )
}