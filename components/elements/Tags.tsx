import React from "react";

function Tags(props: any) {
    const { data } = props
    let newData = data.split(',')
    return (<>
        {newData.map((item: any, key: any) => {
            if (item) {
                return <div key={key} className="tagsection">{item}</div>
            }
        })}
    </>);
}

export default Tags;