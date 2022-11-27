import React, { useEffect, useState } from "react";
import { Row, Col, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import moment from "moment";
import Config from '../../common/Config'
import { getMatchesByDay } from "../../store/ScoreRedux";

function MatchesByDay(props: any) {
    const { type, navigate } = props
    const [groups, setGroups] = useState([])
    const dispatch = useDispatch()
    const matcheslistByDay = useSelector((state: any) => state.score.matcheslistByDay)
    const groupedBySeries = Config.groupBy(matcheslistByDay, 'series_type');
    const { TabPane } = Tabs;

    useEffect(() => {
        let date = new Date()
        let month = Number(date.getMonth()) + 1
        let fromDate = `${date.getFullYear()}-${month < 9 ? "0" + month : month}-${date.getDate() < 9 ? "0" + date.getDate() : date.getDate()}`
        dispatch(getMatchesByDay(fromDate))
    }, [type]);

    return (
        <div className="seriesBox">
            <h1>Cricket Schedule</h1>
            <Tabs defaultActiveKey="1">
                {Config.groups.map((name, t) => {
                    let data = groupedBySeries[name] ? Config.groupBy(groupedBySeries[name], 'series_date') : {}
                    return <TabPane key={t} tab={name}>
                        {Object.keys(data).map((items, k) => {
                            let events = Config.groupBy(data[items], 'series_name')
                            return <div key={k} className="tab-bar">
                                <div className="month">
                                    <h5>{items}</h5>
                                </div>
                                <div className="series">
                                    {Object.keys(events).map((item, key) => {
                                        let event = events[item]
                                        return <div key={key}>
                                            <Row>
                                                <Col span={5}>
                                                    <p style={{ border: 'none' }}><b>{item}</b></p>
                                                </Col>
                                                <Col span={19}>
                                                    {event.map((item: any, key: any) => {
                                                        return <div key={key}>
                                                            <div style={{ float: 'right', paddingRight: 15 }}>{moment.utc(item.startdt).format('hh:mm A')}<br />{moment.utc(item.startdt).format('Do MMM YYYY')}</div>
                                                            <p><a onClick={() => navigate(`/match-news/${item.name}`)}>{item?.team1} VS {item?.team2}, {item?.match_desc}</a><br />
                                                                {item?.venue?.ground}, {item?.venue?.city} {item?.venue?.country}</p>
                                                        </div>
                                                    })}
                                                </Col>
                                            </Row>
                                        </div>
                                    })}
                                </div>
                            </div>
                        })}
                    </TabPane>
                })}
            </Tabs>
        </div>
    );
}

export default MatchesByDay;