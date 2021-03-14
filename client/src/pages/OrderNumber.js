import React from "react";

const OrderNumber = (props) => {
    const trackingsData = props.apiData.trackings.data ? props.apiData.trackings.data : false;
    const checkpointsData = props.apiData.checkpoints.data ? props.apiData.checkpoints.data : false;
    const trackingNumber = props.trackingNumber ? props.trackingNumber : false;

    let orders = getOrders() ? getOrders() : [];
    let deliveryStatus = getDeliveryStatus() ? getDeliveryStatus() : {};

    function getOrders() {
        if (!trackingsData) return false;
        if (!trackingNumber) return false;

        let ordersTemp = [];
        for (var i = 0; i < trackingsData.length; i++) {
            if (trackingsData[i].tracking_number === trackingNumber) {
                ordersTemp.push(trackingsData[i]);
            }
        }

        return ordersTemp;
    }

    function getDeliveryStatus() {
        if (!trackingsData) return false;
        if (!checkpointsData) return false;

        let deliveryStatusTemp = {};
        for (var i = 0; i < checkpointsData.length; i++) {
            if (checkpointsData[i].tracking_number === trackingNumber) {
                deliveryStatusTemp = checkpointsData[i];
            }
        }

        return deliveryStatusTemp;
    }

    return (
        <div className={'order-number'}>
            <div className={'order-number-row'}>
                <div className={'order-number-column display-order-number'}>
                    <div className={'heading'}>Order Number</div>
                    <div className={'content'}>
                        {orders.length > 0 ? orders[0].orderNo : 'N/A'}
                    </div>
                </div>
                <div className={'order-number-column delivery-address'}>
                    <div className={'heading'}>Delivery Address</div>
                    {orders.length > 0 ? (
                    <div className={'content'}>
                        {orders[0].street}<br/>
                        {orders[0].zip_code} {orders[0].city}
                    </div>
                    ) : (
                        <div className={'content'}>
                            N/A
                        </div>
                    )}
                </div>
            </div>
            <div className={'order-number-row'}>
                <div className={'order-number-column order-number-button'}>
                    <div className={'order-number-row'}>
                        <div className={'order-number-column'}>
                            <div className={'heading'}>Tracking Number</div>
                            <div className={'content'}>
                                {trackingNumber ? trackingNumber : 'N/A'}
                            </div>
                        </div>
                    </div>
                    <div className={'order-number-row'}>
                        <div className={'order-number-column'}>
                            <div className={'heading'}>Current Status</div>
                            <div className={'content short-status'}>
                                {Object.keys(deliveryStatus).length > 0 ? deliveryStatus.status_text : 'Status N/A'}
                            </div>
                            <div className={'long-status'}>
                                {Object.keys(deliveryStatus).length > 0 ? deliveryStatus.status_details : 'Status details N/A'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'order-number-row'}>
                <div className={'order-number-column order-number-button'}>
                    <div className={'heading articles'}>Articles</div>

                    {orders ? (
                        orders.map((order, index) => (

                            order.product_name && order.quantity ?

                                    <div key={index} className={'order-number-row product'}>
                                        <div className={'quantity order-number-column'}>
                                            x{order.quantity ? order.quantity : ''}
                                        </div>
                                        <div className={'image order-number-column'}>
                                            {order.articleImageUrl ?
                                                <img src={order.articleImageUrl} alt={'product'}></img>
                                                : ''}
                                        </div>
                                        <div className={'details order-number-column'}>
                                            <div className={'product-name'}>
                                                {order.product_name ? order.product_name : ''}
                                            </div>
                                            <div className={'serial-number'}>
                                                {order.articleNo ? order.articleNo : ''}
                                            </div>
                                        </div>
                                    </div>

                            : 'N/A'

                        ))
                    ) : <div>Loading...</div>}

                </div>
            </div>
        </div>
    )

};

export default OrderNumber;
