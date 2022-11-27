import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Layout from '../components/layout/Layout'
import { Tabs, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
// import Live from "../components/elements/Live";
// import FutureSeries from "../components/elements/FutureSeries";
// import MatchesByDay from "../components/elements/MatchesByDay";
// import Teams from "../components/elements/Teams";
// import ArchiveSeries from "../components/elements/ArchiveSeries";

function LiveScore(props: any) {
  const dispatch = useDispatch()
  const homeSettings = useSelector((state: any) => state.auth.homeSettings)
  const [tab, setTab] = useState(1)
  const [subtab, setSubTab] = useState(1)
  const { TabPane } = Tabs;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, []);


  return (
    <Layout>
      <Head>
        <title>{homeSettings?.meta_title}</title>
        <meta name="description" content={homeSettings?.meta_description} />
      </Head>
      <div className="tab-sec">
        <Row>
          <Col xs={{ span: 22, offset: 1 }} lg={{ span: 22, offset: 1 }}>
            <div className="tab">
              {/* <Tabs defaultActiveKey="1" onChange={(val: any) => setTab(val)}>

                <TabPane tab="Current Matches" key="1">
                  <h2>Live Cricket Score</h2>
                  <Tabs defaultActiveKey="1" onChange={(val: any) => setSubTab(val)}>
                    <TabPane tab="Live" key="1">
                      {subtab == 1 && (<Live type={'live'} />)}
                    </TabPane>

                    <TabPane tab="Recent" key="2">
                      {subtab == 2 && (<Live type={'recent'} />)}
                    </TabPane>

                    <TabPane tab="Upcoming" key="3">
                      {subtab == 3 && (<Live type={'upcoming'} />)}
                    </TabPane>

                  </Tabs>
                </TabPane>

                <TabPane tab="Current & Future Series" key="2">
                  {tab == 2 && (<FutureSeries type={'future'} />)}
                </TabPane>

                <TabPane tab="Matches By Day" key="3">
                  {tab == 3 && (<MatchesByDay type={'day'} />)}
                </TabPane>

                <TabPane tab="Teams" key="4">
                  {tab == 4 && (<Teams type={'teams'} />)}
                </TabPane>

                <TabPane tab="Series Archive" key="5">
                  {tab == 5 && (<ArchiveSeries type={'archive'} />)}
                </TabPane>

              </Tabs> */}
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default LiveScore;