import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";


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
    }, defaultState);

    console.log(data);

    return (
        <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <Link to={'/1'}>Page 1</Link>
                        <Link to={'/2'}>Page 2</Link>
                        <Link to={'/3'}>Page 3</Link>
                    </header>
                    <Switch>
                        <Route path={'/1'}>
                            <p>{data.apiResponse}</p>
                        </Route>
                        <Route path={'/2'}>
                            <div>
                                <pre>{JSON.stringify(data.checkpoints.data, null, 2)}</pre>
                            </div>
                        </Route>
                        <Route path={'/3'}>
                            <div>
                                <pre>{JSON.stringify(data.trackings.data, null, 2)}</pre>
                            </div>
                        </Route>
                    </Switch>
                </div>
        </Router>
    );

};

export default App;
