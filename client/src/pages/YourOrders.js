import React from "react";
import {useHistory} from "react-router-dom";
import {Button} from 'reactstrap';

const YourOrders = (props) => {
    const trackingsData = props.apiData.trackings.data ? props.apiData.trackings.data : false;
    const checkpointsData = props.apiData.checkpoints.data ? props.apiData.checkpoints.data : false;
    const email = props.email ? props.email : '';

    const history = useHistory();

    let orders = [];
    getOrdersThatMatchEmail();
    getOrderStatuses();

    function getOrdersThatMatchEmail() {
        if (!trackingsData) return;

        for (let i = 0; i < trackingsData.length; i++) {
            if (trackingsData[i].email === email) {
                orders.push(trackingsData[i]);
            }
        }
    }

    function getOrderStatuses() {
        if (!trackingsData) return;
        if (!checkpointsData) return;
        if (orders.length <= 0) return;

        for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < checkpointsData.length; j++) {
                if (orders[i].tracking_number === checkpointsData[j].tracking_number) {
                    orders[i].status_text = checkpointsData[j].status_text;
                }
            }
        }
    }

    function OnClickOrder(trackingNumber) {
        if(saveTrackingNumber(trackingNumber)) {
            goToPage('/order-number')
        }
    }

    function saveTrackingNumber(trackingNumber) {
        if (!trackingNumber) return false;

        props.setTrackingNumber(trackingNumber);
        return true;
    }

    function goToPage(path) {
        history.push(path);
    }

    return (
        <div className={'your-orders'}>
            <div className={'title h4'}>Your Orders</div>
            {orders ? (
                orders.map((order, index) => (

                    <Button key={index}
                            color='primary'
                            className={'order-button'}
                            onClick={() => OnClickOrder(order.tracking_number)}
                    >
                        <div className={'order-button-row'}>
                            <div className={'order-button-column'}>
                                <div className={'heading'}>Order Number</div>
                                <div className={'content'}>{order.orderNo}</div>
                            </div>
                            <div className={'order-button-column'}>
                                <div className={'heading'}>Current Status</div>
                                <div
                                    className={'content'}>{order.status_text ? order.status_text : 'N/A'}</div>
                            </div>
                        </div>
                        <div className={'order-button-row'}>
                            <div className={'order-button-column'}>
                                <div className={'heading'}>Delivery Address</div>
                                <div className={'content'}>
                                    {order.street}<br/>
                                    {order.zip_code} {order.city}
                                </div>
                            </div>
                        </div>
                    </Button>

                ))
            ) : (<div>Loading...</div>)}
        </div>
    )

};

export default YourOrders;
