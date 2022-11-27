import React, { useState, useEffect } from "react";
import { Row, Col, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import Config from '../../common/Config'
import Image from 'next/image'
import { getAllTeam } from "../../store/ScoreRedux";

const { TabPane } = Tabs;

function Teams(props: any) {
    const { type } = props
    const dispatch = useDispatch()
    const teams = useSelector((state: any) => state.score.teams)
    const grouped = Config.groupBy(teams, 'type');

    useEffect(() => {
        dispatch(getAllTeam())
    }, [type]);

    return (
        <div className="seriesBox">
            <h1>Cricket Teams</h1>
            <Tabs defaultActiveKey="1">
                {Config.groups.map((name, k) => {
                    return <TabPane key={k} tab={name}>
                        <Row>
                            {grouped[name] ? grouped[name].map((item: any, k: any) => {
                                return <Col key={k} span={5}>
                                    <div className="month" style={{ margin: 7, textAlign: 'center' }}>
                                        <h5>{item.team_name}</h5>
                                        {item.team_image && (<img alt="" src={Config.frappe_url + item.team_image} />)}
                                    </div>
                                </Col>
                            }) : null}
                        </Row>
                    </TabPane>
                })}
            </Tabs>
        </div>
    );
}

export default Teams;