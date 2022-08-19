import React, { useEffect } from "react";
import Link from 'next/link'
import { Button, Form, Input } from 'antd';
import $ from 'jquery';
import { useSelector, useDispatch } from 'react-redux'
import { signUpUser, siteLogin, logout } from "../../store/UserRedux";
import SocketApis from '../../utility/socket-apis'

function Headers() {
    const dispatch = useDispatch()
    const newsList = useSelector((state) => state.auth.newsList)
    const token = useSelector((state) => state.user.token)

    useEffect(() => {
        SocketApis.getSocketData('message', (data) => {
            console.log(data)
        });
    }, []);

    // Filter News
    let menNews = newsList.filter(item => item.blog_category === 'men');
    let wpmenNews = newsList.filter(item => item.blog_category === 'women');

    const onSignIn = (values) => {
        dispatch(siteLogin(values))
        $(".signin, .signin-bg, .header-area").removeClass("active");
        $("body").removeClass("overlay");
    };

    const onSignUp = (values) => {
        dispatch(signUpUser(values))
        $(".signin, .signup-bg, .header-area").removeClass("active");
        $("body").removeClass("overlay");
    };

    return (
        <header className="header-area">
            <div className="main-header bg-header">
                <div className="container container-md">
                    <div className="main-header-wrapper">
                        <div className="header-logo">
                            <Link href="/">
                                <span>criczone</span>
                            </Link>
                        </div>
                        <div className="navbar-wrapper">
                            <nav className="navbar-area">
                                <ul>
                                    <li><Link href="/">HOME</Link></li>
                                    <li><Link href="/livescore">LIVE SCORE</Link></li>
                                    <li className="mega-dropdown"><Link href="/">SERIES</Link>
                                        <div className="mega-blog-menu mega-menu">
                                            <div className="mega-menu-wrapper d-flex">
                                                <div className="mega-tab-menu">
                                                    <h4>Category</h4>
                                                    <div className="nav flex-column" id="v-pills-tab" role="tablist"
                                                        aria-orientation="vertical">
                                                        <a className="nav-link active" data-bs-toggle="pill" href="#tab-one"
                                                            role="tab" aria-selected="true">Men</a>
                                                        <a className="nav-link" data-bs-toggle="pill" href="#tab-two" role="tab"
                                                            aria-selected="false">Women</a>
                                                    </div>
                                                </div>
                                                <div className="tab-content mega-tab-content" id="v-pills-tabContent">
                                                    <div className="tab-pane fade show active" id="tab-one">
                                                        <div className="mega-slider-area">
                                                            <div className="megamenu-owl-wrapper owl-carousel"
                                                                data-carousel-loop="false" data-carousel-items="4"
                                                                data-carousel-nav="true" data-carousel-dots="true"
                                                                data-carousel-lg="3" data-carousel-xl="3"
                                                                data-carousel-md="2">

                                                                {/* {menNews.map((item, key) => <Link href={`/details/${item.name}`} ke={key}
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        {Config.randerImage(item.meta_image)}
                                                                        <span className="btn-theme">{item?.category_description}</span>
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                                                                            <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                                                                        </div>
                                                                        <h4>{Config.trunCate(item.title, 40, '. . .')}</h4>
                                                                    </div>
                                                                </Link>)} */}

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="tab-two" role="tabpanel">
                                                        <div className="mega-slider-area">
                                                            <div className="megamenu-owl-wrapper owl-carousel"
                                                                data-carousel-loop="false" data-carousel-items="4"
                                                                data-carousel-nav="true" data-carousel-dots="true"
                                                                data-carousel-lg="3" data-carousel-xl="3"
                                                                data-carousel-md="2">

                                                                {/* {wpmenNews.map((item, key) => <Link href={`/details/${item.name}`} ke={key}
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        {Config.randerImage(item.meta_image)}
                                                                        <span className="btn-theme">{item?.category_description}</span>
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>{moment.utc(item.published_time).format('hh:mm A')}</span>
                                                                            <span>{moment.utc(item.published_on).format('Do MMM YYYY')}</span>
                                                                        </div>
                                                                        <h4>{Config.trunCate(item.title, 40, '. . .')}</h4>
                                                                    </div>
                                                                </Link>)} */}

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="tab-three" role="tabpanel">
                                                        <div className="mega-slider-area">
                                                            <div className="megamenu-owl-wrapper owl-carousel"
                                                                data-carousel-loop="false" data-carousel-items="4"
                                                                data-carousel-nav="true" data-carousel-dots="true"
                                                                data-carousel-lg="3" data-carousel-xl="3"
                                                                data-carousel-md="2">

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/lifestyle/lifestyle-1.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/lifestyle/lifestyle-2.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/lifestyle/lifestyle-3.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/lifestyle/lifestyle-4.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/lifestyle/lifestyle-5.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/lifestyle/lifestyle-6.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="tab-four" role="tabpanel">
                                                        <div className="mega-slider-area">
                                                            <div className="megamenu-owl-wrapper owl-carousel"
                                                                data-carousel-loop="false" data-carousel-items="4"
                                                                data-carousel-nav="true" data-carousel-dots="true"
                                                                data-carousel-lg="3" data-carousel-xl="3"
                                                                data-carousel-md="2">

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/sports/sports-1.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/sports/sports-2.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/sports/sports-3.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/sports/sports-4.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/sports/sports-5.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/sports/sports-6.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="tab-five" role="tabpanel">
                                                        <div className="mega-slider-area">
                                                            <div className="megamenu-owl-wrapper owl-carousel"
                                                                data-carousel-loop="false" data-carousel-items="4"
                                                                data-carousel-nav="true" data-carousel-dots="true"
                                                                data-carousel-lg="3" data-carousel-xl="3"
                                                                data-carousel-md="2">

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/gym/gym-1.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/gym/gym-2.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/gym/gym-3.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/gym/gym-4.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/gym/gym-5.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>

                                                                <a href="single-post-details.html"
                                                                    className="carousel-single-cart">
                                                                    <div className="carousel-card-img">
                                                                        <img src="assets/img/mega-menu-img/gym/gym-6.jpg"
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="carousel-card-content">
                                                                        <div className="post-date-time">
                                                                            <span>7:35 AM</span>
                                                                            <span>16 Nov, 2020</span>
                                                                        </div>
                                                                        <h4>A collection of textile lorem samples lay spread
                                                                            . . .</h4>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="dropdown"><Link href="/cat/news">NEWS</Link>
                                        <ul>
                                            <li><Link href="/cat/trending-news">Trending News</Link></li>
                                            <li><Link href="/cat/editors-pick">Editor's Pick</Link></li>
                                            <li><Link href="/cat/featured-post">Featured Post</Link></li>
                                            <li><Link href="/cat/on-this-day">On this day</Link></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown"><Link href="/cat/match-prediction">MATCH PREDICTION</Link>
                                        <ul>
                                            <li><Link href="/cat/match-review">Match Review</Link></li>
                                            <li><Link href="/cat/match-prediction">Match Prediction</Link></li>
                                            <li><Link href="/cat/match-analysis">Match Analysis</Link></li>
                                            <li><Link href="/cat/fantasy-tips">Fantasy Tips</Link></li>
                                        </ul>
                                    </li>
                                </ul>

                            </nav>
                        </div>
                        <div className="options-area">
                            {token ? <div className="sign-option">
                                <button className="btn-normal" onClick={() => dispatch(logout())}><i className="icofont-sign-out"></i></button>
                            </div> : <div className="sign-option">
                                <button className="btn-normal sign-in-click"><i className="icofont-sign-in"></i></button>
                                <button className="btn-normal sign-up-click"><i className="icofont-user"></i></button>
                            </div>}

                            <div className="toggle-bar">
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="signin-popup-wrapper signin-bg">
                <div className="sign-in-area">
                    <h2 className="left-line-shape">Sign In</h2>
                    <Form
                        className='user-form'
                        name='basic'
                        onFinish={onSignIn}
                    >
                        <Form.Item
                            name='usr'
                            rules={[
                                { required: true, message: 'Please input your Email!' },
                            ]}>
                            <Input placeholder={'Email'} />
                        </Form.Item>

                        <Form.Item
                            name='pwd'

                            rules={[
                                { required: true, message: 'Please input your Password!' },
                            ]}>
                            <Input
                                type='password'
                                placeholder={'Password'}
                            />
                        </Form.Item>

                        <Button type='primary' htmlType='submit'>
                            Login
                        </Button>

                    </Form>
                    <div className="close-popup">
                        <i className="icofont-close-line"></i>
                    </div>
                </div>
            </div>
            <div className="signup-popup-wrapper signup-bg">
                <div className="sign-up-area">
                    <h2 className="left-line-shape">Create Account</h2>
                    <Form
                        className='user-form'
                        name='basic'
                        onFinish={onSignUp}
                    >
                        <Form.Item
                            name='full_name'
                            rules={[
                                { required: true, message: 'Please input your Name!' },
                            ]}>
                            <Input placeholder={'Name'} />
                        </Form.Item>

                        <Form.Item
                            name='email'
                            rules={[
                                { required: true, message: 'Please input your Email!' },
                            ]}>
                            <Input
                                placeholder={'Email'}
                            />
                        </Form.Item>

                        <Button type='primary' htmlType='submit'>
                            Sign Up
                        </Button>

                    </Form>
                    <div className="close-popup">
                        <i className="icofont-close-line"></i>
                    </div>
                </div>
            </div>
        </header>);
}

export default Headers;