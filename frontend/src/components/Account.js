import React, {useState} from "react";
import {useHistory} from 'react-router';

import './Home.css';
import {Button, Form} from 'semantic-ui-react';
import axios from "axios";
const Account = () => {
    let history = useHistory();
    const [values, setValues] = useState({

    });
    const inputsHandler = (e) => {
        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        const key = e.target.id;
        setValues((prevValue) => { 
            return {...prevValue, [key]: value};
        });
    };

    const modUser = () => {
        axios.patch('http://localhost:4000/api/users', values, {
            headers: { "apiJWT": localStorage.getItem('api-token') },
        }).then((response)=> {
            console.log(response.status);
            alert('Usuario Actualizado exitosamente');
            history.push();
        }).catch((error)=> {
            console.log(error);
            alert(` Si no estas logueado loguearse porfavor.`)
        });
    }

    return (
        <main >

            <Form className="home">
            <div> <h2> Update user data </h2> </div>
            <Form.Field>
                <label>Name</label>
                <input placeholder="Name" 
                type="text"
                id="name"
                value={values.name}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Form.Field>
                <label>Username</label>
                <input placeholder="username" 
                type="text"
                id="username"
                value={values.username}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Form.Field>
                <label>Email</label>
                <input placeholder="email" 
                type="email"
                id="email"
                value={values.email}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder="password" 
                type="password"
                id="password"
                value={values.password}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Form.Field>
                <label>Age</label>
                <input placeholder="age" 
                type="number"
                id="age"
                value={values.age}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Form.Field>
                <label>ID</label>
                <input placeholder="id" 
                type="number"
                id="id"
                value={values.id}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Form.Field>
                <label>If you are Admin put iamadmin</label>
                <input placeholder="Are you Admin? " 
                type="text"
                id="isAdmin"
                value={values.isAdmin}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Button onClick={modUser}> Change User Data</Button>
            <Button> Delete User </Button>

            </Form>

        </main>
    );
};

export default Account;