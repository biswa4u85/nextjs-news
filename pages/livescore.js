import React, { useState, useEffect } from "react";
import Head from 'next/head'
import { Tabs, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from "react-i18next";
import Live from "./Scores/Live";
import Upcoming from "./Scores/Upcoming";
import Result from "./Scores/Result";

function LiveScore(props) {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const homeSettings = useSelector((state) => state.auth.homeSettings)
    const token = useSelector((state) => state.auth.token)
    const [tab, setTab] = useState(1)
    const { TabPane } = Tabs;
    let liveData = [{}, {}, {}, {}, {}, {}]

    const onChange = (key) => {
        setTab(key);
    };

    return (
        <>
            <Head>
                <title>{homeSettings?.meta_title}</title>
                <meta name="description" content={homeSettings?.meta_description} />
            </Head>
            <div className="tab-sec">
                <Tabs defaultActiveKey="1" centered onChange={onChange} >
                    <TabPane tab="Live" key="1">
                        <Row>
                            <Col xs={{ span: 22, offset: 1 }} lg={{ span: 13, offset: 5 }}>
                                {tab == 1 && (<Live data={liveData} />)}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Upcoming" key="2">
                        <Row>
                            <Col xs={{ span: 22, offset: 1 }} lg={{ span: 13, offset: 5 }}>
                                {tab == 2 && (<Upcoming data={liveData} />)}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Result" key="3">
                        <Row>
                            <Col xs={{ span: 22, offset: 1 }} lg={{ span: 13, offset: 5 }}>
                                {tab == 3 && (<Result data={liveData} />)}
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>

        </>
    );
}

export default LiveScore;
