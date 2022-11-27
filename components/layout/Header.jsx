import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { Button, Form, Input } from 'antd';
import $ from 'jquery';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { signUpUser, siteLogin, logout } from "../../store/UserRedux";
import { getHomeSettings } from '../../store/MainRedux'
import { getScorecard } from "../../store/ScoreRedux";
import Config from "../../common/Config";
import Loader from '../../components/elements/Loader';
import SocketApis from '../../utility/socket-apis'

function Headers() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [search, setSearch] = useState('');
    const token = useSelector((state) => state.user.token)
    const isFetching = useSelector((state) => state.auth.isFetching)
    const homeSettings = useSelector((state) => state.auth.homeSettings)

    useEffect(() => {
        dispatch(getHomeSettings({ token }))
        SocketApis.getSocketData('message', (data) => {
            if (data) {
                dispatch(getScorecard(data))
                for (let key in data) {
                    let score = (data[key] && data[key]?.matchScore) ? data[key].matchScore : null
                    if (score) {
                        let team1Score = score?.team1Score?.inngs2 ? score?.team1Score?.inngs2 : score?.team1Score?.inngs1
                        let team2Score = score?.team2Score?.inngs2 ? score?.team2Score?.inngs2 : score?.team2Score?.inngs1
                        $(`#live_home_${key} #live_home`).text(team1Score && (`${team1Score?.runs ? team1Score?.runs : 0}/${team1Score?.wickets ? team1Score?.wickets : 0} - ${team1Score?.overs ? team1Score?.overs : 0}`));
                        $(`#live_inner_${key} #live_home`).text(team1Score && (`${team1Score?.runs ? team1Score?.runs : 0}/${team1Score?.wickets ? team1Score?.wickets : 0} - ${team1Score?.overs ? team1Score?.overs : 0}`));
                        $(`#live_home_${key} #live_away`).text(team2Score && (`${team2Score?.runs ? team2Score?.runs : 0}/${team2Score?.wickets ? team2Score?.wickets : 0} - ${team2Score?.overs ? team2Score?.overs : 0}`));
                        $(`#live_inner_${key} #live_away`).text(team2Score && (`${team2Score?.runs ? team2Score?.runs : 0}/${team2Score?.wickets ? team2Score?.wickets : 0} - ${team2Score?.overs ? team2Score?.overs : 0}`));
                        $(`#live_home_${key} #live_home`).attr("class", 'red');
                        $(`#live_home_${key} #live_away`).attr("class", 'red');
                        $(`#live_home_${key} #live_result`).attr("class", 'red');
                        $(`#live_inner_${key} #live_home`).attr("class", 'red');
                    }
                }
            }
        });
    }, []);

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
            {isFetching && (<Loader />)}
            <div className="main-header bg-header">
                <div className="container container-md">
                    <div className="main-header-wrapper">
                        <div className="header-logo">
                            <Link href="/">
                                <img width="230" height="70" src={`${Config.frappe_url}/${homeSettings.site_logo}`} alt="image" />
                            </Link>
                        </div>


                        <div className="navbar-wrapper">
                            <nav className="navbar-area">
                                <ul>
                                    <li><Link href="/">HOME</Link></li>
                                    <li><Link href="/live-score">LIVE SCORE</Link></li>
                                    <li className="mega-dropdown"><Link href="/">SERIES</Link>
                                        <div className="mega-blog-menu mega-menu">
                                            <div className="mega-menu-wrapper d-flex newMega">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <h3><Link href="/category/mens">Men</Link></h3>
                                                            <ul>
                                                                <li><Link href="/category/domestic">Domestic</Link>
                                                                    <ul>
                                                                        <li><Link href="/category/ipl">IPL</Link></li>
                                                                    </ul>
                                                                </li>
                                                                <li><Link href="/category/international">International</Link>
                                                                    <ul>
                                                                        <li><Link href="/category/asia-cup">Asia Cup</Link></li>
                                                                        <li><Link href="/category/legends-league-cricket">Legends League Cricket</Link></li>
                                                                        <li><Link href="/category/road-safety-world-series">Road Safety World Series</Link></li>
                                                                        <li><Link href="/category/t20-world-cup">T20 World Cup</Link></li>
                                                                    </ul></li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-6">
                                                            <h3><Link href="/category/women">Women</Link></h3>
                                                            <ul>
                                                                <li><Link href="/category/wbbl-2022">WBBL 2022</Link></li>
                                                                <li><Link href="/category/womens-asia-cup-2022">{`Women's Asia cup 2022`}</Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="dropdown"><Link href="/category/news">NEWS</Link>
                                        <ul>
                                            <li><Link href="/category/trending-news">Trending News</Link></li>
                                            <li><Link href="/category/editors-pick">{`Editor's Pick`}</Link></li>
                                            <li><Link href="/category/featured-post">Featured Post</Link></li>
                                            <li><Link href="/category/on-this-day">On this day</Link></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown"><Link href="/category/match-prediction">MATCH PREDICTION</Link>
                                        <ul>
                                            <li><Link href="/category/match-review">Match Review</Link></li>
                                            <li><Link href="/category/match-prediction">Match Prediction</Link></li>
                                            <li><Link href="/category/match-analysis">Match Analysis</Link></li>
                                            <li><Link href="/category/fantasy-tips">Fantasy Tips</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link href="/category/review-zone">REVIEW ZONE</Link></li>
                                    <li><Link href="/category/video">VIDEO</Link></li>

                                </ul>

                            </nav>
                        </div>

                        <div className="options-area">
                            <div className="dark-light">
                                <i className="icofont-moon" />
                            </div>

                            <div className="Search-popup">
                                <div className="Search-icon">
                                    <i className="icofont-search" />
                                </div>
                                <div className="search-popup-box">

                                    <div className="search-box">
                                        <span><i className="icofont-search-1" /></span>
                                        <input type="text" placeholder="Type your keyword"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <button onClick={() => {
                                            router.push(`/search/${search}`)
                                            $(".search-popup-box").removeClass("active");
                                            $("body").removeClass("overlay");
                                        }}

                                        >Search</button>
                                    </div>
                                    <div className="close-popup">
                                        <i className="icofont-close-line" />
                                    </div>
                                </div>
                            </div>


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

                        <button type='primary' htmlType='submit'>
                            Login
                        </button>

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

                        <button type='primary' htmlType='submit'>
                            Sign Up
                        </button>

                    </Form>
                    <div className="close-popup">
                        <i className="icofont-close-line"></i>
                    </div>
                </div>
            </div>
        </header>);
}

export default Headers;