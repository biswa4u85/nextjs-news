import React, { useEffect, useState } from "react";
import { Row, Col, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import moment from "moment";
import Config from '../../common/Config'
import { getAllSeries } from "../../store/ScoreRedux";

function FutureSeries(props: any) {
    const { type } = props
    const dispatch = useDispatch()
    const series = useSelector((state: any) => state.score.series)
    const grouped = Config.groupBy(series, 'type');
    const { TabPane } = Tabs;

    useEffect(() => {
        dispatch(getAllSeries({ 'status': 'open' }))
    }, [type]);

    return (
        <div className="seriesBox">
            <h1>Cricket Schedule</h1>
            <Tabs defaultActiveKey="1">
                {Config.groups.map((name, k) => {
                    if (grouped[name]) {
                        let data = Config.groupBy(grouped[name], 'sortdate');
                        return <TabPane key={k} tab={name}>
                            {Object.keys(data).map((items, k) => {
                                return <div key={k} className="tab-bar">
                                    <div className="month">
                                        <div className="series">
                                            <Row>
                                                <Col span={5}>
                                                    <h5>{data[items][0]?.date}</h5>
                                                </Col>
                                                <Col span={19}>
                                                    {data[items].map((item: any, key: any) => {
                                                        return <div key={key}>
                                                            <p><a href="">{item.series_name}</a>, {moment.utc(item.startdt).format('Do hh:mm A')}</p>
                                                        </div>
                                                    })}
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>

                            })}
                        </TabPane>
                    }
                })}
            </Tabs>
        </div>
    );
}

export default FutureSeries;