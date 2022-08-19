import React, { useEffect } from "react";
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import Config from "../../common/Config";
import { getCmsDetails } from '../../store/MainRedux'

function Cms(props) {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const token = Config.token
    const cmsData = useSelector((state) => state.auth.cms)
    const cms = cmsData[id]

    useEffect(() => {
        // window.scrollTo(0, 0)
        dispatch(getCmsDetails({ token, id }))
    }, [id]);

    return (
        <>
            <Head>
                <title>{cms?.meta_title}</title>
                <meta name="description" content={cms?.meta_description} />
            </Head>
            <section className="single-post-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="single-post-content">
                                <h2>{cms?.title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: cms?.main_section_html ? cms?.main_section_html : cms?.main_section }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Cms;
