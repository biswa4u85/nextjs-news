import React, { useEffect } from "react";
import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import { useSelector, useDispatch } from 'react-redux'
import moment from "moment";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { searchPost } from '../../store/MainRedux'
import Config from "../../common/Config";

function Search(props: any) {
  const router = useRouter()
  let { name } = router.query
  const dispatch = useDispatch()
  const token = Config.token
  const homeSettings = useSelector((state: any) => state.auth.homeSettings)
  const searchValue = useSelector((state: any) => state.auth.searchValue)

  useEffect(() => {
    window.scrollTo(0, 0)
    handlePageChange()
  }, [name]);

  const handlePageChange = (page = 1, size = 12) => {
    let params = { token, name, page, size }
    dispatch(searchPost(params))
  }

  return (
    <Layout>
      <Head>
        <title>{homeSettings?.meta_title}</title>
        <meta name="description" content={homeSettings?.meta_description} />
      </Head>
      <section className="single-post-area">
        <div className="container">
          <div className="weekly-list-item">
            {searchValue.data ? searchValue.data.map((item: any, key: any) => <div key={key} className="news-vcard-single">
              <div className="news-vcard-img">
                {(Config as any).randerImage(item, 220)}
              </div>
              <div className="news-vcard-content">
                <div className="news-vcard-title">
                  <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                  <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                  <span>{item.blogger}</span>
                </div>
                <h3><Link href={`/news/${item.name}`}>{Config.trunCate(item.title, 40, '. . .')}</Link></h3>
              </div>
            </div>) : null}
          </div>
          {/* <div style={{ marginTop: 10, textAlign: 'right' }}><Pagination onChange={handlePageChange} defaultCurrent={1} pageSize={12} total={newsListByCatCount} /></div> */}
        </div>
      </section>
    </Layout>
  );
}

export default Search;
