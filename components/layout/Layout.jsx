import React, { useState, useEffect } from "react";
import Head from "next/head";
import BackToTop from "../elements/BackToTop";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                {/* <script src="../../public/assets/js/app.min.js"></script>
                <script src="../../public/assets/js/scripts.js"></script> */}
            </Head>
            <Header />
            {children}
            <Footer />
            <BackToTop />
        </>
    );
}

export default Layout;