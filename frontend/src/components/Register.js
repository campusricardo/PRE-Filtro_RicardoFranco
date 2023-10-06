import React, { useState } from "react";
import './Register.css';

import {Button, Form} from 'semantic-ui-react';

import {useHistory} from 'react-router';

import axios from 'axios';

const Register = () => {
    let history = useHistory();
    const [values, setValues] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        age: '',
        id: '',
        isAdmin: ''
    });

    const inputsHandler = (e) => {
        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        const key = e.target.id;
        setValues((prevValue) => { 
            return {...prevValue, [key]: value};
        });
    };

    const postData = () => {
        axios.post('http://localhost:4000/api/users', values).then((response)=> {
            console.log(response);
            alert('Usuario Creado Correctamente');
            history.push();
        }).catch((error) => {
            console.log(error);
            alert('Debes llenar todos los datos o ya se esta utilizando el username, id o email o estas colocando un email no valido osea que no tiene arroba');
        });
    }

    return (
    <main className="main">
        <Form className="from-container">
            <Form.Field className="form-field">
                <label>Name</label>
                <input placeholder="Name" 
                type="text"
                id="name"
                value={values.name}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Form.Field className="form-field">
                <label>Username</label>
                <input placeholder="username" 
                type="text"
                id="username"
                value={values.username}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Form.Field className="form-field">
                <label>Email</label>
                <input placeholder="email" 
                type="email"
                id="email"
                value={values.email}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Form.Field className="form-field">
                <label>Password</label>
                <input placeholder="password" 
                type="password"
                id="password"
                value={values.password}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Form.Field className="form-field">
                <label>Age</label>
                <input placeholder="age" 
                type="number"
                id="age"
                value={values.age}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Form.Field className="form-field">
                <label>ID</label>
                <input placeholder="id" 
                type="number"
                id="id"
                value={values.id}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Form.Field className="form-field">
                <label>If you are Admin put iamadmin</label>
                <input placeholder="Are you Admin? " 
                type="text"
                id="isAdmin"
                value={values.isAdmin}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Button className="button-form"type='submit' onClick={postData} > Crear </Button>
        </Form>
    </main>
    );

};

export default Register;