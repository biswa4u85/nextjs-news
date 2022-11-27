import React, { useEffect } from "react";
import Head from 'next/head'
import Layout from '../components/layout/Layout'
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getHeadlineList, getNewsCategory, getNewsList } from '../store/MainRedux'
import Config from "../common/Config";
import SideBar from "../components/elements/SideBar";
import HomeSlider from '../components/elements/HomeSlider';
import dallyUpdate from '../assets/img/dallyUpdate.png'

function Home() {
  const dispatch = useDispatch()
  const router = useRouter()
  const token = Config.token
  const homeSettings = useSelector((state: any) => state.auth.homeSettings)
  const headlines = useSelector((state: any) => state.auth.headlines)
  const newsList = useSelector((state: any) => state.auth.newsList)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
    dispatch(getHeadlineList({ token }))
    dispatch(getNewsCategory({ token }))
    dispatch(getNewsList({ page: 1, size: 500, token }))
  }, []);


  // Latest News
  let latestNews = newsList.filter((item: any) => item.blog_category === 'news');
  latestNews.length = 4

  // Today News
  let todayNews = newsList.filter((item: any) => item.blog_category === 'news');
  todayNews.length = 3

  // Home 1st News
  let home1stNews = newsList.filter((item: any) => item.blog_category === 'trending-news');

  // Home 2nd News
  let home2ndNews = newsList.filter((item: any) => item.blog_category === 'match-prediction');

  // Home 3rd News
  let home3rdNews = newsList.filter((item: any) => item.blog_category === 'match-review');

  // Home 4th News
  let home4thNews = newsList.filter((item: any) => item.blog_category === 't20-world-cup');

  // Latest Vedios
  let latestVedios = JSON.parse(JSON.stringify(newsList))
  latestVedios.length = 1

  const filterByDay = (filter: any, number: any) => {
    let cat = (homeSettings && homeSettings[filter]) ? homeSettings[filter] : null
    let dataList = newsList.filter((item: any) => item.blog_category === cat);
    dataList.length = number
    return dataList
  }

  const filterByWeek = (cat: any, number: any) => {
    let dataList = newsList.filter((item: any) => item.blog_category === cat);
    dataList.length = number
    return dataList
  }


  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <title>{homeSettings?.meta_title}</title>
        <meta name="description" content={homeSettings?.meta_description} />
      </Head>
      <div className="nvbanner-area">
        <h1>{Config?.title}</h1>
        <HomeSlider />
        <div className="viewAllMatch"><button onClick={() => router.push('/live-score')}>View all Matches</button></div>
      </div>
      <div className="container">

        <div className="row">
          <div className="col-xl-8">
            <div className="bnr-lft">
              <div className="bnr-lft-title" data-aos="fade-up">
                <div className="news-heading">
                  <h5>Headline</h5>
                </div>
                <div className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {headlines.map((item: any, key: any) => <div key={key} className={`carousel-item ${key == 0 ? 'active' : ''}`}>
                      {item.description}
                    </div>)}
                  </div>
                </div>
              </div>
              <div className="bnr-lft-cnt">
                <div className="row">
                  <div className="col-md-6">
                    <div className="bnr-lft-cnt-rgt">
                      {home1stNews[0] && (<div className="btl-simple-card" data-aos="fade-up"
                        data-aos-delay="100">
                        {(Config as any).randerImage(home1stNews[0], 200, 500)}
                        <div className="btlc-content-wrapper">
                          <Link href={`/category/${home1stNews[0].blog_category}`}><span className="btn">{home1stNews[0].category_description}</span></Link>
                          <div className="btlc-marking">
                            <span className="icofont-star"></span>
                          </div>
                          <div className="btlc-content">
                            <div className="btcl-content-status">
                              <span>{moment.utc(home1stNews[0].published_time).format('hh:mm A')}</span>
                              <span>{moment.utc(home1stNews[0].published_on).format('Do MMM YYYY')}</span>
                              <span>{home1stNews[0].blogger}</span>
                            </div>
                            <h3><Link href={`/news/${home1stNews[0].route}`}>{Config.trunCate(home1stNews[0].title, 40, '. . .')}</Link></h3>

                          </div>
                        </div>
                      </div>)}
                      {home2ndNews[0] && (<div className="btl-simple-card" data-aos="fade-up"
                        data-aos-delay="100">
                        {(Config as any).randerImage(home2ndNews[0], 200, 500)}
                        <div className="btlc-content-wrapper">
                          <Link href={`/category/${home2ndNews[0].blog_category}`}><span className="btn">{home2ndNews[0].category_description}</span></Link>
                          <div className="btlc-marking">
                            <span className="icofont-star"></span>
                          </div>
                          <div className="btlc-content">
                            <div className="btcl-content-status">
                              <span>{moment.utc(home2ndNews[0].published_time).format('hh:mm A')}</span>
                              <span>{moment.utc(home2ndNews[0].published_on).format('Do MMM YYYY')}</span>
                              <span>{home2ndNews[0].blogger}</span>
                            </div>
                            <h3><Link href={`/news/${home2ndNews[0].route}`}>{Config.trunCate(home2ndNews[0].title, 40, '. . .')}</Link></h3>

                          </div>
                        </div>
                      </div>)}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="bnr-lft-cnt-rgt">
                      {home3rdNews[0] && (<div className="btl-simple-card" data-aos="fade-up"
                        data-aos-delay="100">
                        {(Config as any).randerImage(home3rdNews[0], 200, 500)}
                        <div className="btlc-content-wrapper">
                          <Link href={`/category/${home3rdNews[0].blog_category}`}><span className="btn">{home3rdNews[0].category_description}</span></Link>
                          <div className="btlc-marking">
                            <span className="icofont-star"></span>
                          </div>
                          <div className="btlc-content">
                            <div className="btcl-content-status">
                              <span>{moment.utc(home3rdNews[0].published_time).format('hh:mm A')}</span>
                              <span>{moment.utc(home3rdNews[0].published_on).format('Do MMM YYYY')}</span>
                              <span>{home3rdNews[0].blogger}</span>
                            </div>
                            <h3><Link href={`/news/${home3rdNews[0].route}`}>{Config.trunCate(home3rdNews[0].title, 40, '. . .')}</Link></h3>
                          </div>
                        </div>
                      </div>)}
                      {home4thNews[0] && (<div className="btl-simple-card" data-aos="fade-up"
                        data-aos-delay="100">
                        {(Config as any).randerImage(home4thNews[0], 200, 500)}
                        <div className="btlc-content-wrapper">
                          <Link href={`/category/${home4thNews[0].blog_category}`}><span className="btn">{home4thNews[0].category_description}</span></Link>
                          <div className="btlc-marking">
                            <span className="icofont-star"></span>
                          </div>
                          <div className="btlc-content">
                            <div className="btcl-content-status">
                              <span>{moment.utc(home4thNews[0].published_time).format('hh:mm A')}</span>
                              <span>{moment.utc(home4thNews[0].published_on).format('Do MMM YYYY')}</span>
                              <span>{home4thNews[0].blogger}</span>
                            </div>
                            <h3><Link href={`/news/${home4thNews[0].route}`}>{Config.trunCate(home4thNews[0].title, 40, '. . .')}</Link></h3>
                          </div>
                        </div>
                      </div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <SideBar />
          </div>
        </div>
      </div>


      <div className="pro-area" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className="pro-wrapper">
              <br />
              <br />
              <Image height={200} src={dallyUpdate} alt="Advertiser" />
            </div>
          </div>
        </div>
      </div>


      <section className="newsupdate-area">
        <div className="container">
          <div className="title-heading" data-title="Daily Update" data-aos="zoom-in">
            <h2 data-aos="fade-up" data-aos-delay="50">Daily Update News</h2>
          </div>
          <div className="row">
            <div className="col-xl-9">
              <div className="news-lft-wrapper">
                <div className="news-card-wrapper">
                  <div className="ns-mini-card">
                    {filterByDay('left_category_one', 1).map((item: any, key: any) => <div key={key} className="btl-simple-card" data-aos="fade-up">
                      {(Config as any).randerImage(item, 190)}
                      <div className="btlc-content-wrapper">
                        <Link href={`/category/${item.blog_category}`}><span className="btn">{item.category_description}</span></Link>
                        <div className="btlc-content">
                          <div className="btcl-content-status">
                            <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                            <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                          </div>
                          <h3><Link href={`/news/${item.route}`}>{Config.trunCate(item.title, 40, '. . .')}</Link></h3>
                        </div>
                      </div>
                    </div>)}
                    {filterByDay('left_category_two', 1).map((item: any, key: any) => <div key={key} className="btl-simple-card" data-aos="fade-up">
                      {(Config as any).randerImage(item, 190)}
                      <div className="btlc-content-wrapper">
                        <Link href={`/category/${item.blog_category}`}><span className="btn">{item.category_description}</span></Link>
                        <div className="btlc-content">
                          <div className="btcl-content-status">
                            <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                            <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                          </div>
                          <h3><Link href={`/news/${item.route}`}>{Config.trunCate(item.title, 40, '. . .')}</Link></h3>
                        </div>
                      </div>
                    </div>)}
                  </div>

                  {filterByDay('center_category', 1).map((item: any, key: any) => <div key={key} className="btl-simple-card" data-aos="fade-up"
                    data-aos-delay="50">
                    {(Config as any).randerImage(item, 200, 500)}
                    <div className="btlc-content-wrapper">
                      <Link href={`/category/${item.blog_category}`}><span className="btn-card btn-red">{item.category_description}</span></Link>
                      <div className="btlc-content">
                        <div className="btcl-content-status">
                          <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                          <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                        </div>
                        <h3><Link href={`/news/${item.route}`}>{Config.trunCate(item.title, 60, '. . .')}</Link></h3>
                      </div>
                    </div>
                  </div>)}

                </div>
                <div className="ns-card-list" data-aos="fade-up" data-aos-delay="100">

                  {filterByDay('bottom_category', 3).map((item: any, key: any) => <div key={key} className="nsc-list-single">
                    <div className="nsc-list-img">
                      {Config.randerImage(item, null, null, true)}
                    </div>
                    <div className="nsc-list-content">
                      <div className="nsc-list-title">
                        <span><Link href={`/category/${item.blog_category}`}>{item.category_description}</Link></span>
                        <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                      </div>
                      <h3><Link href={`/news/${item.route}`}>{Config.trunCate(item.title, 40, '. . .')}</Link> </h3>
                    </div>
                  </div>)}

                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <div className="news-vcard-wrapper">

                {filterByDay('right_category_one', 1).map((item: any, key: any) => <div key={key} className="news-vcard-single aos-init aos-animate" data-aos="fade-up">
                  <Link href={`/category/${item.blog_category}`}><span className="btn-card btn-red">{item.category_description}</span></Link>
                  <div className="news-vcard-img">
                    {(Config as any).randerImage(item, 290)}
                  </div>
                  <div className="news-vcard-content">
                    <div className="news-vcard-title">
                      <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                      <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                    </div>
                    <h3><Link href={`/news/${item.route}`}>{Config.trunCate(item.title, 40, '. . .')}</Link></h3>
                  </div>
                </div>)}

                {filterByDay('right_category_two', 1).map((item: any, key: any) => <div key={key} className="news-vcard-single aos-init aos-animate" data-aos="fade-up">
                  <Link href={`/category/${item.blog_category}`}><span className="btn-card btn-red">{item.category_description}</span></Link>
                  <div className="news-vcard-img">
                    {(Config as any).randerImage(item, 290)}
                  </div>
                  <div className="news-vcard-content">
                    <div className="news-vcard-title">
                      <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                      <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                    </div>
                    <h3><Link href={`/news/${item.route}`}>{Config.trunCate(item.title, 40, '. . .')}</Link></h3>
                  </div>
                </div>)}

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="weekly-update-area">
        <div className="container">
          <div className="title-heading" data-title="Weekly Update" data-aos="zoom-in">
            <h2 data-aos="fade-up" data-aos-delay="50">This Week Update</h2>
          </div>

          <div className="weekly-tab-wrapper">
            <ul className="nav" role="tablist" data-aos="fade-up" data-aos-delay="100">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" data-bs-toggle="pill" data-bs-target="#travel" role="tab"
                  aria-selected="true">T20 World Cup</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" data-bs-toggle="pill" data-bs-target="#food" role="tab"
                  aria-selected="false">Domestic Matches</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" data-bs-toggle="pill" data-bs-target="#medicare" role="tab"
                  aria-selected="false">International Matches</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" data-bs-toggle="pill" data-bs-target="#fashion" role="tab"
                  aria-selected="false">{`Editor's Pick`}</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" data-bs-toggle="pill" data-bs-target="#fitness" role="tab"
                  aria-selected="false">Analysis/Reviews</button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent" data-aos="fade-up" data-aos-delay="150">
              <div className="tab-pane fade show active" id="travel" role="tabpanel">
                <div className="weekly-list-item">

                  {filterByWeek('t20-world-cup', 4).map((item: any, key: any) => <div key={key} className="news-vcard-single">
                    <div className="news-vcard-img">
                      {(Config as any).randerImage(item, 220)}
                    </div>
                    <div className="news-vcard-content">
                      <div className="news-vcard-title">
                        <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                        <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                      </div>
                      <h3><Link href={`/news/${item.route}`}>{Config.trunCate(item.title, 40, '. . .')}</Link></h3>
                    </div>
                  </div>)}


                </div>
              </div>
              <div className="tab-pane fade" id="food" role="tabpanel">
                <div className="weekly-list-item">

                  {filterByWeek('domestic', 4).map((item: any, key: any) => <div key={key} className="news-vcard-single">
                    <div className="news-vcard-img">
                      {(Config as any).randerImage(item, 220)}
                    </div>
                    <div className="news-vcard-content">
                      <div className="news-vcard-title">
                        <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                        <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                      </div>
                      <h3><Link href={`/news/${item.route}`}>{Config.trunCate(item.title, 40, '. . .')}</Link></h3>
                    </div>
                  </div>)}
                </div>
              </div>
              <div className="tab-pane fade" id="medicare" role="tabpanel">
                <div className="weekly-list-item">

                  {filterByWeek('international', 4).map((item: any, key: any) => <div key={key} className="news-vcard-single">
                    <div className="news-vcard-img">
                      {(Config as any).randerImage(item, 220)}
                    </div>
                    <div className="news-vcard-content">
                      <div className="news-vcard-title">
                        <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                        <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                      </div>
                      <h3><Link href={`/news/${item.route}`}>{Config.trunCate(item.title, 40, '. . .')}</Link></h3>
                    </div>
                  </div>)}
                </div>
              </div>
              <div className="tab-pane fade" id="fashion" role="tabpanel">
                <div className="weekly-list-item">

                  {filterByWeek("editors-pick", 4).map((item: any, key: any) => <div key={key} className="news-vcard-single">
                    <div className="news-vcard-img">
                      {(Config as any).randerImage(item, 220)}
                    </div>
                    <div className="news-vcard-content">
                      <div className="news-vcard-title">
                        <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                        <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                      </div>
                      <h3><Link href={`/news/${item.route}`}>{Config.trunCate(item.title, 40, '. . .')}</Link></h3>
                    </div>
                  </div>)}
                </div>
              </div>
              <div className="tab-pane fade" id="fitness" role="tabpanel">
                <div className="weekly-list-item">

                  {filterByWeek('match-prediction', 4).map((item: any, key: any) => <div key={key} className="news-vcard-single">
                    <div className="news-vcard-img">
                      {(Config as any).randerImage(item, 220)}
                    </div>
                    <div className="news-vcard-content">
                      <div className="news-vcard-title">
                        <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                        <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                      </div>
                      <h3><Link href={`/news/${item.route}`}>{Config.trunCate(item.title, 40, '. . .')}</Link></h3>
                    </div>
                  </div>)}
                </div>
              </div>
            </div>
          </div>

          <div className="fd-carousel-wrapper owl-carousel" data-carousel-loop="false" data-carousel-items="3"
            data-carousel-nav="false" data-carousel-dots="true" data-carousel-md="2" data-carousel-sm="2"
            data-carousel-lg="3" data-carousel-xl="3" data-aos="fade-up">
            {filterByWeek('Video', 12).map((item: any, key: any) => <div key={key} className="fdc-single-item">
              <div className="fdc-img">
                <Link href={`/news/${item.route}`}>
                  {(Config as any).randerImage(item, 220)}
                </Link>
              </div>
              <div className="fdc-content">
                <div className="fdc-title">
                  <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                  <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                </div>
                <h3><Link href={`/news/${item.route}`}>{Config.trunCate(item.title, 40, '. . .')}</Link></h3>
              </div>
            </div>)}
          </div>
        </div>
      </section>

      {/* <div className="pro-area" data-aos="fade-up">
                <div className="container">
                    <div className="row">
                        <div className="pro-wrapper">
                            <Image src="https://tpc.googlesyndication.com/simgad/14556471411178073418?" width="900" height="120" alt="Advertiser" border="0" />
                        </div>
                    </div>
                </div>
            </div> */}
    </Layout>
  );
}

export default Home;