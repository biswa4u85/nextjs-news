import React, { useEffect } from "react";
import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Config from "../../common/Config";
import { getCmsDetails } from '../../store/MainRedux'

function Pages(props: any) {
  const router: any = useRouter()
  let { name } = router.query
  const dispatch = useDispatch()
  const token = Config.token
  const cmsData = useSelector((state: any) => state.auth.cms)
  const cms = cmsData[name]

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
    dispatch(getCmsDetails({ token, name }))
  }, [name]);

  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <title>{cms?.meta_title}</title>
        <meta name="description" content={cms?.meta_description} />
      </Head>
      <section className="single-post-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="single-post-content">
                <h1>{cms?.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: cms?.main_section_html ? cms?.main_section_html : cms?.main_section }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Pages;
