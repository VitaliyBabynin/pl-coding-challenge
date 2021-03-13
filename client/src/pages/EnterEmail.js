import React, {useState} from "react";
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
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";

const EnterEmail = ({data}) => {
    const [email, setEmail] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const fieldName = 'Email';
    const history = useHistory();

    const onClickNext = () => {
        if (!isEmailValid()) return;
        if (!doesEmailHaveOrders()) return;

        routeChange(`/your-orders`)
    };

    function isEmailValid() {
        if (email.trim() === '') {
            setWarningMessage(`${fieldName} is required`);
            return false;
        }
        if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email,)) {
            setWarningMessage(`Please enter a valid email`);
            return false;
        }
        return true;
    }

    function doesEmailHaveOrders() {
        const trackingsData = data.trackings.data ? data.trackings.data : false;
        if (!trackingsData) return false;

        for (var i = 0; i < trackingsData.length; i++) {
            if (trackingsData[i].email === email) {
                console.log(trackingsData[i].orderNo);
                return true;
            }
        }

        setWarningMessage('No orders found for ' + email.toString());
        return false;
    }

    function routeChange(path) {
        history.push(path);
    }

    return (
        <InputGroup className={'email-form'}>
            <div className={'title h4'}>Please enter your email address to see your recent orders</div>
            <div className={'hint'}>Hint: <div>julian@parcellab.com</div></div>
            <div className={'warning'}>{warningMessage}</div>
            <div className={'user-input'}>{fieldName}: <Input type='email' onChange={({target: {value}}) => {
                setEmail(value)
            }} value={email}/></div>
            <Button color="primary" onClick={onClickNext}>SEND</Button>
        </InputGroup>
    )

};

export default EnterEmail;
