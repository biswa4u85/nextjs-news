import React, { useEffect, useRef } from "react";
import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { Button, Form, Input } from 'antd';
import $ from "jquery";
import moment from "moment";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getNewsDetails, addComments } from '../../store/MainRedux'
import Config from "../../common/Config";
import Tags from '../../components/elements/Tags';
import instagram from "../../assets/image/instagram.png";
import facebook from "../../assets/image/facebook.png";
import twitter from "../../assets/image/twitter.png";
import youtube from "../../assets/image/youtube.png";

const { TextArea } = Input;

function News(props: any) {
  const router = useRouter()
  let { name } = router.query
  const dispatch = useDispatch()
  const pageActive = useRef(false);
  const [form] = Form.useForm();
  const token = Config.token
  const newsList = useSelector((state: any) => state.auth.newsList)
  const newsDetails = useSelector((state: any) => state.auth.newsDetails)
  const isAddComment = useSelector((state: any) => state.auth.isAddComment)
  const userToken = useSelector((state: any) => state.user.token)
  const user = useSelector((state: any) => state.user.user)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
    dispatch(getNewsDetails({ token, name }))
  }, [name]);

  useEffect(() => {
    if (!newsDetails) {
      // router.push('/')
    }
  }, [newsDetails]);

  // Latest News
  let latestNews = newsList.filter((item: any) => item.blog_category === 'news');
  latestNews.length = 5

  // Related News
  let relatedNews = newsList.filter((item: any) => item.blog_category === 'news');
  relatedNews.length = 5

  let comments = newsDetails?._comments ? JSON.parse(newsDetails._comments) : []

  const onFinish = (values: any) => {
    dispatch(addComments({ ...values, reference_name: newsDetails.name, comment_by: user.first_name, comment_email: user.email, content: values.message, token: userToken }))
    pageActive.current = true
  };

  useEffect(() => {
    if (isAddComment && pageActive.current) {
      pageActive.current = false
      dispatch(getNewsDetails({ token, name }))
      // form.resetFields();
    }
  }, [isAddComment]);


  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <title>{newsDetails?.meta_title}</title>
        <meta name="description" content={newsDetails?.meta_description} />
      </Head>
      <section className="single-post-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="single-post-content">
                <div className="figer-img">
                  {(Config as any).randerImage(newsDetails)}
                  <button className="btn btn-theme">{newsDetails?.category_description}</button>
                </div>
                <div className="timeline">
                  <span>{moment.utc(newsDetails?.published_time).format('hh:mm A')}</span>
                  <span>{moment.utc(newsDetails?.published_on).format('Do MMM YYYY')}</span>
                  <span>{newsDetails?.blogger}</span>
                </div>
                <h1>{newsDetails?.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: newsDetails?.content_html ? newsDetails?.content_html : newsDetails?.content }}></div>
                <div className="details_tags"><Tags data={newsDetails?._user_tags ? newsDetails?._user_tags : ''} /></div>
                {/* <div className="reaction">
                                    <h3>Your Reaction on this post</h3>
                                    <ul>
                                        <li><a href="single-post-details.html#"><Image src={rect1} alt="icon" /><span>45</span></a></li>
                                        <li><a href="single-post-details.html#"><Image src={rect2} alt="icon" /></a></li>
                                        <li><a href="single-post-details.html#"><Image src={rect3} alt="icon" /><span>01</span></a></li>
                                        <li><a href="single-post-details.html#"><Image src={rect4} alt="icon" /></a></li>
                                        <li><a href="single-post-details.html#"><Image src={rect5} alt="icon" /><span>25</span></a></li>
                                    </ul>
                                </div> */}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="single-post-sidebar">
                <aside className="header-aside">
                  <h4>Latest News  <span className="dark-red"><i className="icofont-fire"></i></span></h4>
                  <div className="card-list card-counting">
                    {latestNews.map((item: any, key: any) => <div key={key} className="single-card-list card-border">
                      <div className="card-list-img">
                        {Config.randerImage(item, 100, 70, true)}
                      </div>
                      <div className="card-list-cont">
                        <div className="card-list-discript">
                          <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                          <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                        </div>
                        <div className="card-list-heading">
                          <h6><Link href={`/news/${item.name}`}>{Config.trunCate(item.title, 60, '. . .')}</Link></h6>
                        </div>
                      </div>
                    </div>)}
                  </div>
                  {/* <div className="video-card">
                                        <Image src="https://tpc.googlesyndication.com/simgad/14556471411178073418?" width="250" height="250" alt="Advertiser" border="0" />
                                    </div> */}
                </aside>
                <br />
                {/* <div className="promo-add">
                                    <Image src={promoAdd} alt="image" />
                                    <button className="btn btn-white-outline">Promotional Ad</button>
                                </div> */}
                <div className="related-news">
                  <aside className="header-aside">
                    <h4>Related News</h4>
                    <div className="card-list card-counting">
                      {relatedNews.map((item: any, key: any) => <div key={key} className="single-card-list card-border">
                        <div className="card-list-img">
                          {Config.randerImage(item, 100, 70, true)}
                        </div>
                        <div className="card-list-cont">
                          <div className="card-list-discript">
                            <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                            <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                          </div>
                          <div className="card-list-heading">
                            <h6><Link href={`/news/${item.name}`}>{Config.trunCate(item.title, 60, '. . .')}</Link></h6>
                          </div>
                        </div>
                      </div>)}
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
          <div className="author-wrap">
            <div className="ath-social">
              <h3>Share This Post</h3>
              <ul className="social-icon social-outline-gray">
                <li><Link href="https://www.facebook.com/CriczoneNewsWebsite" target="_blank"><Image alt="" width={30} src={facebook} /></Link></li>
                <li><Link href={`https://www.youtube.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`} target="_blank"><Image alt="" width={30} src={youtube} /></Link></li>
                <li><Link href="https://twitter.com/CriczoneN" target="_blank"><Image alt="" width={30} src={twitter} /></Link></li>
                <li><Link href="https://instagram.com/criczonenews?igshid=NmZiMzY2Mjc=" target="_blank"><Image alt="" width={30} src={instagram} /></Link></li>
              </ul>
            </div>
          </div>

          {(comments.length > 0) && (<div className="single-post-comment">
            <div className="news-subscribe-heading">
              <h2><span></span>Show comments<span></span>
              </h2>
            </div>
            <div className="single-post-form">
              {comments.map((item: any, key: any) => <div key={key} className="comments">
                <label>Message by {item.by}</label>
                <br />
                <div dangerouslySetInnerHTML={{ __html: item.comment }} />
              </div>)}
            </div>
          </div>)}

          <div className="single-post-comment">
            <div className="news-subscribe-heading">
              <h2><span></span>Leave a comment<span></span>
              </h2>
            </div>
            <div className="single-post-form">
              {userToken ? <Form
                form={form}
                onFinish={onFinish}
                initialValues={{
                  name: user?.first_name,
                  email: user?.email,
                }}
              >
                <div className="spf-group">
                  <Form.Item
                    name='name'
                    label="Full Name"
                    getValueFromEvent={e => (e.target.value).trimStart()}
                    rules={[
                      {
                        required: true,
                        message: 'Add your Full Name',
                      },
                    ]}>
                    <Input readOnly placeholder={'Enter your Full Name'} />
                  </Form.Item>
                  <Form.Item
                    name='email'
                    label='Your e-mail'
                    getValueFromEvent={e => (e.target.value).trimStart()}
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Email Address!',
                      },
                    ]}>
                    <Input readOnly placeholder={'Enter your e-mail'} />
                  </Form.Item>
                </div>
                <Form.Item
                  name='message'
                  label="Message"
                  getValueFromEvent={e => (e.target.value).trimStart()}
                  rules={[
                    {
                      required: true,
                      message: 'Add Messages',

                    },
                  ]}>
                  <TextArea placeholder={'Enter Messages'} rows={4} />
                </Form.Item>
                <Form.Item>
                  <Button className="btn btn-theme" type='primary' htmlType='submit'>{'Submit Comment'}</Button>
                </Form.Item>
              </Form> : <Button onClick={() => {
                $(".signin, .signin-bg, .header-area").addClass("active");
                $("body").addClass("overlay");
                $(".sign-option").removeClass("active");
              }} className="btn btn-theme">{'Login to add a comment'}</Button>}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default News;