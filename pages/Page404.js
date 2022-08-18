import React, { useEffect } from "react";
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import noData from "../assets/img/nodata.jpg";


function Page404(props) {
    const homeSettings = useSelector((state) => state.auth.homeSettings)

    useEffect(() => {
        // window.scrollTo(0, 0)
    }, []);

    return (
        <>
            <Head>
                <title>{homeSettings?.meta_title}</title>
                <meta name="description" content={homeSettings?.meta_description} />
            </Head>
            <section className="single-post-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="single-post-content">
                                <h2>Page Not Found</h2>
                                <img width={100} src={noData} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Page404;
