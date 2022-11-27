import React, { useEffect, useState } from "react";
import type { AppProps } from 'next/app'
import Loader from '../components/elements/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../store';
import { Provider } from 'react-redux';
import { saveState } from "../utility/browser-storage";
import { debounce } from "debounce";
import '../assets/css/plugin.min.css';
import '../assets/css/components.css';
import '../assets/css/style.css';
import '../assets/css/live.css';

store.subscribe(
  debounce(() => {
    saveState('redux', store.getState());
  }, 800)
);

export default function App({ Component, pageProps }: AppProps) {

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  return <>
    {!loading ? (
      <Provider store={store}><Component {...pageProps} /><ToastContainer /></Provider>
    ) : (
      <Loader />
    )}
  </>
}