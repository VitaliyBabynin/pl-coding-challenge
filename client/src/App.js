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

import EnterEmail from './pages/EnterEmail';
import YourOrders from './pages/YourOrders';
import OrderNumber from './pages/OrderNumber';

const App = () => {
    const defaultData = {
        apiResponse: '',
        checkpoints: {},
        trackings: {}
    };
    const [data, setData] = useState(defaultData);
    const [email, setEmail] = useState('');
    const [orderNumber, setOrderNumber] = useState('');

    // Fetch Data from API
    useEffect(() => {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => JSON.parse(res))
            .then(res => setData(res))
    }, []);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <div className={'navigation'}>
                            <Link to={'/enter-email'}>Enter email</Link>
                            <Link to={'/your-orders'}>Your orders</Link>
                            <Link to={'/order-number'}>Order number</Link>
                    </div>
                </header>
                <div className={'body-container'}>
                    <div className={'body-row'}>
                        <Switch>
                            <Route path={'/enter-email'}>
                                <EnterEmail collectEmail={setEmail} apiData={data}/>
                            </Route>
                            <Route path={'/your-orders'}>
                                <YourOrders email={email} setTrackingNumber={setOrderNumber} apiData={data}/>
                            </Route>
                            <Route path={'/order-number'}>
                                <OrderNumber trackingNumber={orderNumber} apiData={data}/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    )

};

export default App;
