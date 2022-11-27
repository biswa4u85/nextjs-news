import React, { useEffect } from "react";
import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import moment from "moment";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getNewsListByCat } from '../../store/MainRedux'
import Config from "../../common/Config";

function Category(props: any) {
  const router = useRouter()
  let { name } = router.query
  const dispatch = useDispatch()
  const token = Config.token
  const categorys = useSelector((state: any) => state.auth.categorys)
  const newsListByCat = useSelector((state: any) => state.auth.newsListByCat.data)
  const newsListByCatCount = useSelector((state: any) => state.auth.newsListByCat.count)
  const category = categorys.find((x: any) => x.name == name)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
    handlePageChange()
    if (!category) {
      // router.push('/')
    }
  }, [name]);


  const handlePageChange = (page = 1, size = 12) => {
    let params = { token, name, page, size }
    dispatch(getNewsListByCat(params))
  }

  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <title>{category?.meta_title}</title>
        <meta name="description" content={category?.meta_description} />
      </Head>
      <section className="single-post-area">
        <div className="container">
          <div className="weekly-list-item">
            {newsListByCat ? newsListByCat.map((item: any, key: any) => <div key={key} className="news-vcard-single">
              <div className="news-vcard-img">
                {Config.randerImage(item, 220)}
              </div>
              <div className="news-vcard-content">
                <div className="news-vcard-title">
                  <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                  <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                  <span>{item.blogger}</span>
                </div>
                <h3><Link href={`/news/${item.route}`}>{Config.trunCate(item.title, '2')}</Link></h3>
              </div>
            </div>) : null}
          </div>
          <div style={{ marginTop: 10, textAlign: 'right' }}><Pagination onChange={handlePageChange} defaultCurrent={1} pageSize={12} total={newsListByCatCount} /></div>
        </div>
      </section>
    </Layout>
  );
}

export default Category;