import React, { useEffect, useState } from "react";
import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import { Row, Col, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import moment from "moment";
import Link from 'next/link'
import { useRouter } from 'next/router'
import Config from '../../common/Config'
import { getMatchesBySeries } from "../../store/ScoreRedux";

function Series(props: any) {
  const { type } = props
  const router = useRouter()
  let { name } = router.query
  const dispatch = useDispatch()
  const homeSettings = useSelector((state: any) => state.auth.homeSettings)
  const matcheslistBySerie = useSelector((state: any) => state.score.matcheslistBySerie)
  const groupedBySeries: any = Config.groupBy(matcheslistBySerie, 'match_format');
  const serie = matcheslistBySerie ? matcheslistBySerie[0] : {}

  useEffect(() => {
    dispatch(getMatchesBySeries(name))
  }, [type]);

  return (
    <Layout>
      <Head>
        <title>{homeSettings?.meta_title}</title>
        <meta name="description" content={homeSettings?.meta_description} />
      </Head>
      <div className="seriesBox">
        <Row>
          <Col xs={{ span: 22, offset: 1 }} lg={{ span: 22, offset: 1 }}>
            <div className="tab">
              <div style={{ padding: 5 }}>
                <h1>{serie?.series_name}</h1>
                <h5>{Object.keys(groupedBySeries).map((item) => { return (item != 'undefined') ? `${groupedBySeries[item].length} ${item}s, ` : '' })} {moment.utc(serie?.series_start).format('Do MMM')} - {moment.utc(serie?.series_end).format('Do MMM')}</h5>
              </div>
              <div className="month">
                <div className="series">
                  {matcheslistBySerie.map((item: any, key: any) => {
                    return <p key={key}><Row>
                      <Col span={5}>
                        {moment.utc(item?.startdt).format('MMM Do, dd')}
                      </Col>
                      <Col span={14}>
                        <a onClick={() => router.push(`/match-news/${item.name}`)}>{item?.team1} VS {item?.team2}, {item?.match_desc}</a><br />
                        {item?.venue?.ground}, {item?.venue?.city} {item?.venue?.country}
                      </Col>
                      <Col span={5}>
                        {moment.utc(item?.startdt).format('hh:mm A')}<br />
                        <b>{item.result}</b>
                      </Col>
                    </Row></p>
                  })}
                </div>
              </div>
              <br />
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default Series;