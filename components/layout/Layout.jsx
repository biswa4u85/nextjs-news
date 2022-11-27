import React, { useState, useEffect } from "react";
import Head from "next/head";
import BackToTop from "../elements/BackToTop";
import Header from "./Header";
import Footer from "./Footer";
import Config from "../../common/Config";
import favicon from "../../public/favicon.png"

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <meta charset="utf-8" />
                <link rel="icon" href={favicon} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content={Config.title} />
                <meta name="google-site-verification" content="lC8HjSC8H4PdUy4XPIkNiDHFSam7iGKu5Sh9JQmq-Bw" />
                <link rel="apple-touch-icon" href={favicon} />
                <link rel="manifest" href={'../../public/manifest.json'} />
                {/* <script src="../../assets/js/app.min.js"></script>
                <script src="../../assets/js/scripts.js"></script> */}
                <title>{Config.title}</title>
                {/* <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script> */}
                {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2698878418376050"
                    crossorigin="anonymous"></script> */}
                {/* Google tag (gtag.js)  */}
                {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-6D18RCSEWZ"></script> */}
                <script>
                    {/* window.dataLayer = window.dataLayer || [];
                    function gtag() {dataLayer.push(arguments)}
                    gtag('js', new Date());

                    gtag('config', 'G-6D18RCSEWZ'); */}
                </script>
                {/* Google Tag Manager  */}
                {/* <script>(function (w, d, s, l, i) {
                    w[l] = w[l] || []; w[l].push({
                        'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
      }); var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-MFFHG2K');</script> */}
                {/* End Google Tag Manager  */}

                {/* Google Tag Manager (noscript)  */}
                {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFFHG2K" height="0" width="0"
                    style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript> */}
                {/* End Google Tag Manager (noscript)  */}
            </Head>
            <Header />
            {children}
            <Footer />
            <BackToTop />
        </>
    );
}

export default Layout;