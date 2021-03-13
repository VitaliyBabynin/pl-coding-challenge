import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
// import './App.css';
import './scss/main.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
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

import EnterEmail from './pages/EnterEmail';

const App = () => {
    const defaultState = {
        apiResponse: '',
        checkpoints: {},
        trackings: {}
    };

    const [data, setData] = useState(defaultState);

    useEffect(() => {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => JSON.parse(res))
            .then(res => setData(res))
    }, []);

    console.log(data);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <div className={'navigation'}>
                        <NavLink>
                            <Link to={'/enter-email'}>Enter email</Link>
                        </NavLink>
                        <NavLink>
                            <Link to={'/your-orders'}>Your orders</Link>
                        </NavLink>
                        <NavLink>
                            <Link to={'/order-number'}>Order number</Link>
                        </NavLink>
                    </div>
                </header>
                <body>
                <div className={'body-row'}>
                    <Switch>
                        <Route path={'/enter-email'}>
                            <EnterEmail data={data}></EnterEmail>
                        </Route>
                        <Route path={'/your-orders'}>
                            <YourOrders data={data}></YourOrders>
                        </Route>
                        <Route path={'/order-number'}>
                            <OrderNumber data={data}></OrderNumber>
                        </Route>
                    </Switch>
                </div>
                </body>
            </div>
        </Router>
    )

};

export default App;


const YourOrders = ({data}) => {
    const trackingsData = data.trackings.data;
    console.log(trackingsData);

    return (
        <div className={'your-orders'}>
            {trackingsData ? (
                trackingsData.map((order, index) => (
                    <p key={index}>{order.orderNo}</p>
                ))
            ) : (<div>Loading...</div>)}
            <pre>{JSON.stringify(data.trackings.data, null, 2)}</pre>
        </div>
    )

};


const OrderNumber = ({data}) => {

    return (
        <div className={'order-number'}>
            <pre>{JSON.stringify(data.checkpoints.data, null, 2)}</pre>
        </div>
    )

};
