import React, { useState } from "react";
import './Register.css';

import {Button, Form} from 'semantic-ui-react';

import {useHistory} from 'react-router';

import axios from 'axios';

const Login = () => {

    let history = useHistory();
    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const inputsHandler = (e) => {
        const value = e.target.value;
        const key = e.target.id;
        setValues((prevValue) => { 
            return {...prevValue, [key]: value};
        });
    };

    const loginUser = () => {
        axios.post('http://localhost:4000/api/users/login', values).then((response)=> {
            localStorage.setItem('api-token', response.data.token)
            console.log(response);
            history.push();
            return alert('Log In successfully');
        }).catch((error) =>{
            console.log(error);
            return alert('Your Password or Username is Wrong');
        });
    }

        return (
            <main className="main">
                <Form>
                <Form.Field>
                <label>Username</label>
                <input placeholder="Username" 
                type="text"
                id="username"
                value={values.username}
                onChange={inputsHandler}
                />
                </Form.Field>
                <Form.Field>
                <label>Password</label>
                <input placeholder="Password" 
                type="password"
                id="password"
                value={values.password}
                onChange={inputsHandler}
                />
                </Form.Field>
                <Button type="submit" onClick={loginUser}> Login </Button>
                </Form>
            </main>
        );

};

export default Login;