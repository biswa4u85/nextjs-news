import React, { useEffect } from "react";
import { Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import moment from "moment";
import Config from '../../common/Config'
import SocketApis from '../../utility/socket-apis'
import { getMatchesByFilter } from "../../store/ScoreRedux";
const { TabPane } = Tabs;
function Live(props: any) {
    const { type, navigate } = props
    const dispatch = useDispatch()
    const matcheslistByFilter = useSelector((state: any) => state.score.matcheslistByFilter)
    const grouped = Config.groupBy(matcheslistByFilter, 'series_type');

    useEffect(() => {
        dispatch(getMatchesByFilter(type))
        return () => {
            if (type != 'live') {
                for (let item of matcheslistByFilter) {
                    if (item.sub_satus === 'live' && Config.checkTime(item.startdt)) {
                        SocketApis.unSubscribe(item.name)
                    }
                }
            }
        }
    }, [type]);

    useEffect(() => {
        if (type == 'live') {
            for (let item of matcheslistByFilter) {
                if (item.sub_satus === 'live' && Config.checkTime(item.startdt)) {
                    SocketApis.subscribe(item.name)
                }
            }
        }
    }, [matcheslistByFilter]);

    return (<div className="seriesBox">
        <h1>Cricket Schedule</h1>
        <Tabs defaultActiveKey="1">
            {Object.keys(grouped).map((name, g) => {
                if (grouped[name]) {
                    let data = Config.groupBy(grouped[name], 'series_name');
                    if (name != 'undefined') {
                        return <TabPane key={g} tab={name}>
                            {Object.keys(data).map((items, k) => {
                                return <div key={k} className="tab-bar">
                                    <div className="month">
                                        <h5>{items}</h5>
                                    </div>
                                    {data[items].map((item: any, key: any) => {
                                        let team1Score = item?.score?.team1Score?.inngs2 ? item?.score?.team1Score?.inngs2 : item?.score?.team1Score?.inngs1
                                        let team2Score = item?.score?.team2Score?.inngs2 ? item?.score?.team2Score?.inngs2 : item?.score?.team2Score?.inngs1
                                        return <div key={key} id={`live_inner_${item.name}`}>
                                            <div className="africa">
                                                <h5>{item?.team1} VS {item?.team2}<span> {item?.match_desc}</span></h5>
                                                <h6>{moment.utc(item.startdt).format('hh:mm A')} {moment.utc(item.startdt).format('Do MMM YYYY')} at {item?.venue?.ground}, {item?.venue?.city} {item?.venue?.country}</h6>
                                            </div>
                                            {type == 'upcoming' ? <div className="match">
                                                <h5 onClick={() => navigate(`/match-news/${item.name}`)}>View Details</h5>
                                            </div> : <div className="match">
                                                <div className="vl">
                                                    <h5>{item.team1s} <span id="live_home">{team1Score && (`${team1Score?.runs ? team1Score?.runs : 0}/${team1Score?.wickets ? team1Score?.wickets : 0} - ${team1Score?.overs ? team1Score?.overs : 0}`)}</span></h5>
                                                    <h5>{item.team2s} <span id="live_away">{team2Score && (`${team2Score?.runs ? team2Score?.runs : 0}/${team2Score?.wickets ? team2Score?.wickets : 0} - ${team2Score?.overs ? team2Score?.overs : 0}`)}</span></h5>
                                                    <h6 id="live_result">{item.result}</h6>
                                                </div>
                                            </div>}
                                            <div className="runs">
                                                <h6 onClick={() => navigate(`/match-news/${item.name}`)}>Live Score</h6>
                                                <div className="score-border"></div>
                                                <h6 onClick={() => navigate(`/match-news/${item.name}`)}>Scorecard</h6>
                                                <div className="score-border"></div>
                                                <h6 onClick={() => navigate(`/match-news/${item.name}`)}>Full Commentary</h6>
                                                <div className="score-border"></div>
                                                <h6 onClick={() => navigate(`/category/match-prediction`)}>News</h6>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            })}
                        </TabPane>
                    }
                }
            })}
        </Tabs>
    </div>);
}

export default Live;