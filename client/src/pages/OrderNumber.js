import React from "react";

const OrderNumber = (props) => {
    const trackingsData = props.apiData.trackings.data ? props.apiData.trackings.data : false;
    const checkpointsData = props.apiData.checkpoints.data ? props.apiData.checkpoints.data : false;

    return (
        <div className={'order-number'}>
            <pre>{JSON.stringify(checkpointsData, null, 2)}</pre>
        </div>
    )

};

export default OrderNumber;
