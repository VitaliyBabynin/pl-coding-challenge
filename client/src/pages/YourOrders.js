import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory,
} from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    NavLink
} from 'reactstrap';

const YourOrders = (props) => {
    const trackingsData = props.apiData.trackings.data ? props.apiData.trackings.data : false;
    const checkpointsData = props.apiData.checkpoints.data ? props.apiData.checkpoints.data : false;
    const history = useHistory();

    let orders = [];
    getOrdersThatMatchEmail();
    getOrderStatuses();

    function getOrdersThatMatchEmail() {
        if (!trackingsData) return false;

        for (var i = 0; i < trackingsData.length; i++) {
            if (trackingsData[i].email === 'julian@parcellab.com') {
                orders.push(trackingsData[i]);
            }
        }

        return false;
    }

    function getOrderStatuses() {
        if (!trackingsData) return false;
        if (!checkpointsData) return false;

        for (var i = 0; i < orders.length; i++) {
            for (var j = 0; j < checkpointsData.length; j++) {
                if (orders[i].tracking_number === checkpointsData[j].tracking_number) {
                    orders[i].status_text = checkpointsData[j].status_text;
                }
            }
        }
    }

    function OnClickOrder(trackingNumber) {
        saveTrackingNumber(trackingNumber);
        goToPage('/order-number');
    }

    function saveTrackingNumber(trackingNumber) {
        props.setTrackingNumber(trackingNumber);
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
                            className={'order-button btn btn-secondary'}
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
                                    className={'content'}>{order.status_text ? order.status_text : 'Not Available'}</div>
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
