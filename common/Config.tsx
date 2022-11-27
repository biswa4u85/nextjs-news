import noData from "../assets/img/nodata.jpg";
export default {
    hostUrl: 'https://criczone.co',
    twitter: 'CriczoneN',
    apiSocketUrl: 'https://score.techwizards.io:4000',
    frappe_url: 'https://news.techwizards.io',
    frappe_custom_app: 'erp_custom_auth',
    token: 'token 8013775618bd3a7:99fa9ff03295aa8',
    title: 'Get Latest and Breaking Cricket News | Daily Cricket News',
    groups: ['international', 'league', 'domestic', 'women'],
    randerImage: (item: any, height: any, imgHeight: any, type: any) => {
        let src = item?.meta_image
        let imageURL = src ? (String(src).includes('https://') ? src : 'https://news.techwizards.io' + src) : noData
        return <div className="mainImage">
            {!type && (<div className="mainTitle">{item?.title}</div>)}
            <img style={{ height: (imgHeight ? imgHeight : 'inherit') }} src={imageURL} title={item?.image_alt} alt={item?.image_alt} />
            {!type && (<div className="imageCaptions">{item?.image_captions}</div>)}
        </div>
    },
    trunCate: (str: any, max: any, suffix: any) => {
        return <span className={max == 2 ? "trunCate" : "trunCate1"}>{str}</span>
    },
    filterTitle: (title: any) => {
        let res = title.replaceAll("-", " ")
        return res.replaceAll("lotus", "")
    },
    checkDate: (date: any) => {
        const today = new Date();
        const newDate = new Date(date);
        if (today.toDateString() === newDate.toDateString()) {
            return 'Today'
        } else {
            return ''
        }
    },
    checkTime: (date: any) => {
        const now = new Date();
        const nowTime = now.getTime();
        const given = new Date(date);
        const givenTime = given.getTime();
        let difff = nowTime - givenTime
        if (difff > 0) {
            return true
        } else {
            return false
        }
    },
    groupBy: (list: any, key: any) => {
        let gropuArray: any = {}
        for (let item of list) {
            if (item[key] in gropuArray === false) {
                gropuArray[item[key]] = [item]
            } else {
                gropuArray[item[key]].push(item);
            }
        }
        return gropuArray;
    }
}