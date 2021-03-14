import React, {useState} from "react";
import {
    Button,
    Input,
    InputGroup
} from 'reactstrap';
import {useHistory} from "react-router-dom";


const EnterEmail = (props) => {
    const trackingsData = props.apiData.trackings.data ? props.apiData.trackings.data : false;
    const history = useHistory();
    const fieldName = 'Email';
    const [email, setEmail] = useState('');
    const [warningMessage, setWarningMessage] = useState('');

    const onClickNext = () => {
        if (!isEmailValid()) return;
        if (!doesEmailHaveOrders()) return;

        saveEmail();
        goToPage(`/your-orders`);
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
        if (!trackingsData) return false;

        for (var i = 0; i < trackingsData.length; i++) {
            if (trackingsData[i].email === email) {
                return true;
            }
        }

        setWarningMessage('No orders found for ' + email.toString());
        return false;
    }

    function saveEmail() {
        props.collectEmail(email);
    }

    function goToPage(path) {
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
            <Button color='primary' onClick={onClickNext}>SEND</Button>
        </InputGroup>
    )

};

export default EnterEmail;
