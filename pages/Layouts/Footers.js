import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux'
import ftrBg from "../../public/img/svg/ftr-bg.svg";
import FormValidate from "../../common/FormValidate";
import { subscribeEmail, getCmsDetails } from '../../store/MainRedux'

function Footers() {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const emailInput = useRef(null);
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [submenu, setSubmenu] = useState(false)
    const token = useSelector((state) => state.auth.token)
    const homeSettings = useSelector((state) => state.auth.homeSettings)
    const cmsData = useSelector((state) => state.auth.cms)
    const cms = cmsData['about-us-l']

    useEffect(() => {
        dispatch(getCmsDetails({ token, id: 'about-us-l' }))
    }, []);

    const sendNewsletter = () => {
        if (!email) {
            setError('Please enter your email')
            emailInput.current.focus();
            return
        }
        if (!FormValidate.isEmail(email)) {
            setError('Please enter a validate email')
            emailInput.current.focus();
            return
        }
        dispatch(subscribeEmail({ token, email }))
        setEmail('')
    }

    return (
        <>
            <section className="subscribe-area" data-aos="fade-up"
                data-aos-anchor-placement="top-bottom">
                <div className="container">
                    <div className="row">
                        <div className="subscribe-wrapper">
                            <h3>Subscribe Newsletter</h3>
                            <div className="search-box">
                                <span><i className="icofont-envelope"></i></span>
                                <input ref={emailInput} value={email} onChange={(e) => { setError(null); setEmail(e.target.value) }} type="text" placeholder="Enter  your mail" />
                                <button onClick={sendNewsletter}>Subscribe</button>
                            </div>
                            {error && (<div>{error}</div>)}
                        </div>
                    </div>
                </div>
            </section>
            <footer className="footer-area">
                <div className="main-footer transparent-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-5 ft-order-1 mb-lg-50">
                                <div className="ftr-drpt">
                                    <div className="footer-logo">
                                        <Link href="/"><span>criczone</span></Link>
                                    </div>
                                    <p>{cms?.header}</p>
                                </div>
                            </div>
                            <div className="col-xl-2 col-md-4 ft-order-2 mb-sm-30">
                                <div className="ftr-link">
                                    <h3 className="title-line-shape">Category</h3>
                                    <ul>
                                        <li><Link href="/cat/trending-news">Trending News</Link></li>
                                        <li><Link href="/cat/match-prediction">Match Prediction</Link></li>
                                        {/* <li><Link href="/cat/Previews">Previews</Link></li> */}
                                        <li><Link href="/cat/review-zone">Reviews</Link></li>
                                        <li><Link href="/cat/on-this-day">On this Day</Link></li>
                                        <li><Link href="/cat/men">Men</Link></li>
                                        <li><Link href="/cat/women">Women</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2 col-md-4 ft-order-3 mb-sm-30">
                                <div className="ftr-link">
                                    <h3 className="title-line-shape">Useful Link</h3>
                                    <ul>
                                        <li><Link href="/cms/dcma-l">DCMA</Link></li>
                                        <li><Link href="/cms/disclaimer-l">Disclaimer</Link></li>
                                        <li><Link href="/cms/copyright-notice-l">Copyright Notice</Link></li>
                                        <li><Link href="/cms/about-us-l">About Us</Link></li>
                                        <li><Link href="/cms/contact-us-l">Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-4 ft-order-4">
                                <div className="ftr-contact">
                                    <h3 className="title-line-shape">Contact Us</h3>
                                    <p><a href="mailto:info@lotusnews247.com">info@lotusnews247.com</a></p>
                                    <br />
                                </div>
                                <div className="footer-social">
                                    <h6>Follow Us</h6>
                                    <ul className="social-icon social-bg-red">
                                        <li><a href="https://www.facebook.com/Lotusnews247-105292842265621" target="_blank"><i className="icofont-facebook"></i></a></li>
                                        <li><a href="https://www.instagram.com/lotus_news247" target="_blank"><i className="icofont-instagram"></i></a></li>
                                        <li><a href="https://twitter.com/Lotusnews2" target="_blank"><i className="icofont-twitter"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ftr-bg">
                        <Image src={ftrBg} alt="image" />
                    </div>
                </div>
                <div className="ftr-dtls theme-bg">
                    <div className="container">
                        <div className="ftr-dtls-wrapper">
                            <p>Copyright © 2022 lotusnews247 All Rights Reserved.</p>
                            <ul>
                                <li><Link href="/cms/terms-conditions-l">Term & Condition</Link></li>
                                <li><Link href="/cms/privacy-l">Privacy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="footerMobile">
                {submenu && (<ul>
                    <li><Link href="/cat/men">Mens</Link></li>
                    <li><Link href="/cat/women">Women</Link></li>
                    <li><Link href="/cat/international">International</Link></li>
                </ul>)}
                <ul>
                    <li onClick={() => setSubmenu(false)}><Link href="/"><><i className="icofont-home"></i> Home</></Link></li>
                    <li onClick={() => setSubmenu(false)}><Link href="/livescore"><><i className="icofont-score-board"></i>  Live score</></Link></li>
                    <li onClick={() => setSubmenu(false)}><Link href="/cat/trending-news"><><i className="icofont-ssl-security"></i>  Trending</></Link></li>
                    <li onClick={() => setSubmenu(!submenu)}><a className={submenu ? 'active' : ''}><i className="icofont-navigation-menu"></i> More</a></li>
                </ul>
            </div>
        </>
    );
}

export default Footers;