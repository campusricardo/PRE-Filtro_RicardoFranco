import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router';
import './Account.css';
import {Button, Form} from 'semantic-ui-react';
import axios from "axios";
const Account = () => {
    let history = useHistory();
    const [values, setValues] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        age: '',
        id: ''
    });
    
   useEffect(()=>  {
     axios.get('http://localhost:4000/api/users', {
        headers: { "apiJWT": localStorage.getItem('api-token') }
    }).then((response) =>{
        console.log(response);
        setValues(response.data.result);
        console.log(values);
    }).catch((error)=> {
        console.log(error);
        history.push('/login')
        alert('Debes loguearte Primero')
    });
}, []);
    const inputsHandler = (e) => {
        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        const key = e.target.id;
        setValues((prevValue) => { 
            return {...prevValue, [key]: value};
        });
    };
    const delUser = () => {
        const verify = window.confirm('Are you sure you want to delete the user');
        if (verify) {
            axios.delete('http://localhost:4000/api/users', {
            headers: { "apiJWT": localStorage.getItem('api-token')}
        }).then((res) => {
            localStorage.removeItem('api-token');
            history.push('/register');
            alert('Usuario Eliminado Correctamente')
        }).catch((error)=> {
            alert('Hubo un problema borrando tu cuenta');
        });
        }
        return ;
        
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

            <Form className="from-container">
            <div className="div-top"> <h2> Update user data </h2> </div>
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
                <label>If you are </label>
                <input placeholder="Admin put iamadmin" 
                type="text"
                id="isAdmin"
                value={values.isAdmin}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Button className="button-form" onClick={modUser}> Change User Data</Button>
            <Button className="button-form" onClick={delUser}> Delete User </Button>

            </Form>

        </main>
    );
};

export default Account;