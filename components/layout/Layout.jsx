import React, { useState, useEffect } from "react";
import Head from "next/head";
import BackToTop from "../elements/BackToTop";
import Header from "./Header";
import Footer from "./Footer";
import Config from "../../common/Config";
import favicon from "../../assets/image/favicon.png";

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
                <link rel="manifest" href="../../public/manifest.json" />
                <link rel="stylesheet" href="https://news.techwizards.io/assets/news_management/css/plugin.min.css"></link>
                <link rel="stylesheet" href="https://news.techwizards.io/assets/news_management/css/components.css"></link>
                <script src="https://news.techwizards.io/assets/news_management/js/app.min.js"></script>
                <script src="https://news.techwizards.io/assets/news_management/js/scripts.js"></script>
                <title>{Config.title}</title>
                <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2698878418376050"
                    crossorigin="anonymous"></script>
            </Head>
            <Header />
            {children}
            <Footer />
            <BackToTop />
        </>
    );
}

export default Layout;