import React, { useEffect } from "react";
// import OwlCarousel from 'react-owl-carousel';
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux'
import { getFixtures } from "../../store/ScoreRedux";

const responsive = {
    0: {
        items: 1,
    },
    480: {
        items: 1,
    },
    768: {
        items: 3,
    }
}

function HomeSlider() {
    const dispatch = useDispatch()
    const fixtures = useSelector((state) => state.score.fixtures)

    useEffect(() => {
        dispatch(getFixtures())
    }, []);


    return (<div className='owl-carousel owl-theme' responsive={responsive} loop margin={10} nav={false}>
        {fixtures.map((item, key) => <div key={key} className='item'>
            <div className="trending_news">
                <div className="lanka">
                    <h6>Today At {moment.utc(item.date).format('hh:mm A')} . <span> {item.match_subtitle} .</span> {item.status}</h6>
                    <div className='srilanka'>
                        <img src={require(`../../assets/flags/Flag of Afghanistan.gif`)} className="flagimg" /> <span> {item?.home?.name}</span>
                    </div>
                    <div className='srilanka'>
                        <img src={require(`../../assets/flags/Flag of Afghanistan.gif`)} className="flagimg" /> <span>{item?.away?.name}</span>
                    </div>
                    <p>Match starts in <span>{moment.utc(item.date).format('Do MMM YYYY hh:mm A')}</span></p>
                    <div className="lanka-border"></div>
                    <ul>
                        <li>{item.venue}</li>
                    </ul>
                </div>
            </div>
        </div>)}
    </div>);
}

export default HomeSlider;