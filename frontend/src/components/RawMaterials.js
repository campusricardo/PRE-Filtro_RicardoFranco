import React, { useState } from "react";
import './Register.css';

import {Button, Form} from 'semantic-ui-react';

import {useHistory} from 'react-router';

import axios from 'axios';

const RawMaterial = () => {
    let history = useHistory();
    const [values, setValues] = useState({
        name: '',
        valuePerTon: '',
        weightGcubicM: ''
    });

    const inputsHandler = (e) => {
        console.log(values);
        const value = e.target.id !== 'name' ? Number(e.target.value) : e.target.value;
        const key = e.target.id;
        setValues((prevValue) => { 
            return {...prevValue, [key]: value};
        });
    };

    const postData = () => {
        axios.post('http://localhost:4000/api/raw-materials', values, {
            headers: { "api-jwt": localStorage.getItem('api-token') },
        }).then((response)=> {
            console.log(response.status);
            history.push();
        });
    }

    return (
    <main className="Register">
        <Form>
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
                <label>Value per Ton</label>
                <input placeholder="Value per Ton" 
                type="number"
                id="valuePerTon"
                value={values.valuePerTon}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Form.Field>
                <label>Weight in grams per cubic meter </label>
                <input placeholder="Grams per cubic Meter" 
                type="number"
                id="weightGcubicM"
                value={values.weightGcubicM}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Button type='submit' onClick={postData} > Crear </Button>
        </Form>
    </main>
    );

};

export default RawMaterial;