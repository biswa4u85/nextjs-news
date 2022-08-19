import React, { useEffect } from "react";
import Head from 'next/head'
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import moment from "moment";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { getNewsListByCat } from '../../store/MainRedux'
import Config from "../../common/Config";

function Category(props) {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const token = Config.token
    const categorys = useSelector((state) => state.auth.categorys)
    const newsListByCat = useSelector((state) => state.auth.newsListByCat.data)
    const newsListByCatCount = useSelector((state) => state.auth.newsListByCat.count)
    const category = categorys.find((x) => x.name == id)

    useEffect(() => {
        // window.scrollTo(0, 0)
        handlePageChange()
    }, [id]);

    const handlePageChange = (page = 1, size = 12) => {
        let params = { token, id, page, size }
        dispatch(getNewsListByCat(params))
    }

    return (
        <>
            <Head>
                <title>{category?.meta_title_lotus}</title>
                <meta name="description" content={category?.meta_description_lotus} />
            </Head>
            <section className="single-post-area">
                <div className="container">
                    <div className="weekly-list-item">
                        {newsListByCat ? newsListByCat.map((item, key) => <div key={key} className="news-vcard-single">
                            <div className="news-vcard-img">
                                {Config.randerImage(item.meta_image, 220)}
                            </div>
                            <div className="news-vcard-content">
                                <div className="news-vcard-title">
                                    <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                                    <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                                    <span>{item.blogger}</span>
                                </div>
                                <h3><Link href={`/details/${item.name}`}>{Config.trunCate(item.title, 40, '. . .')}</Link></h3>
                            </div>
                        </div>) : null}
                    </div>
                    <div style={{ marginTop: 10, textAlign: 'right' }}><Pagination onChange={handlePageChange} defaultCurrent={1} pageSize={12} total={newsListByCatCount} /></div>
                </div>
            </section>

        </>
    );
}

export default Category;
