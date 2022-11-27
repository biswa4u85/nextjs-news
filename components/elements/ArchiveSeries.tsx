import React, { useEffect, useState } from "react";
import { Row, Col, Select, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import moment from "moment";
import Config from '../../common/Config'
import { getArchivesSeries } from "../../store/ScoreRedux";

function ArchiveSeries(props: any) {
    const { type, navigate } = props
    let date = new Date()
    const [year, setYear] = useState(date.getFullYear())
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch()
    const series = useSelector((state: any) => state.score.archivesSeries)
    const grouped = Config.groupBy(series, 'type');

    useEffect(() => {
        let date = new Date()
        let year,
            myYear: any = [];
        for (year = 1890; year <= date.getFullYear(); year++) {
            myYear.push({
                value: year,
                label: year,
            })
        }
        setYear(date.getFullYear())
        setOptions((myYear).reverse())
    }, []);

    useEffect(() => {
        dispatch(getArchivesSeries(year))
    }, [type, year]);

    return ( 
        <div className="seriesBox">
            <div className="select">
                ALL SEASONS
                <Select
                    onChange={(val) => setYear(val)}
                    showSearch
                    value={year}
                    {...props}
                    options={options}
                />
            </div>
            <h1>Cricket Match Archives - {year}</h1>
            {Config.groups.map((name, k) => {
                return <div key={k}>
                    <div className="tab-bar">
                        <div className="month">
                            <div className="series">
                                <Row>
                                    <Col span={5}>
                                        <h5>{name}</h5>
                                    </Col>
                                    <Col span={19}>
                                        {grouped[name] ? grouped[name].map((item: any, key: any) => {
                                            return <div key={key}>
                                                <p><a onClick={() => navigate(`/series/${item.name}`)}>{item.series_name}</a>, {moment.utc(item.startdt).format('Do MMM YYYY hh:mm A')}</p>
                                            </div>
                                        }) : null}
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    );
}

export default ArchiveSeries;