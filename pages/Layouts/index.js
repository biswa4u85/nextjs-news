import React from "react";
import { useTranslation } from "react-i18next";
import { Layout } from 'antd';
import Headers from "./Headers";
import Footers from "./Footers";
const { Content } = Layout;

function Layouts({ children }) {
    const { t, i18n } = useTranslation();
    const langChange = () => {
        let lang = (i18n.language === 'de') ? 'en' : 'de'
        i18n.changeLanguage(lang)
    }
    return (
        <Layout>
            <Headers />
            <Content>
                {children}
            </Content>
            <Footers />
        </Layout>
    );
}

export default Layouts;