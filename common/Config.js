// import noData from "../assets/img/nodata.jpg";
// import playBtn from "../assets/img/svg/play-btn.svg";
export default {
    apiSocketUrl: 'http://128.199.22.228:3005',
    frappe_url: 'http://128.199.22.228',
    frappe_custom_app: 'erp_custom_auth',
    token: 'token a59af3c40942e89:32a62b7a1ff81e2',
    redisUrl: 'redis://:U2HprsnUISYYpFoHEQeZyUq3wiUTOjlV@redis-14183.c56.east-us.azure.cloud.redislabs.com:14183',
    rapidAPIHost: 'cricket-live-data.p.rapidapi.com',
    rapidAPIKey: 'ceff4f9011mshb4a79448651b42dp119c71jsn663c2e90ee8a',
    rapidAPIUrl: 'https://cricket-live-data.p.rapidapi.com',
    randerImage: (src, height, imgHeight) => {
        let imageURL = src ? (String(src).includes('https://') ? src : 'http://128.199.22.228' + src) : 'noData'
        return <div style={{ textAlign: "center", objectFit: 'cover', height: height }}>
            <img style={{ height: (imgHeight ? imgHeight : 'inherit') }} src={imageURL} alt="image" />
            {/* <div className="news-vcard-play">
                <a className="vimo1" href="https://vimeo.com/63729905"><img
                    src={playBtn} alt="image" /></a>
            </div> */}
        </div>
    },
    trunCate: (str, max, suffix) => {
        return str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))} ${suffix}`
    }
}