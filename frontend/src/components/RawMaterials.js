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
            headers: { "apiJWT": localStorage.getItem('api-token') },
        }).then((response)=> {
            console.log(response.status);
            alert('Materia prima creada con exito');
            history.push();
        }).catch((error)=> {
            console.log(error);
            alert(` Si no estas logueado loguearse porfavor.
            Si si estas logueado, hubo un inconveniente al cargar los datos, puede ser que esta materia prima ya se creo o que no estas colocando todos los datos o mas importante de que no seas ADMIN
            Si no eres admin asegurade en ir a la tuerquita y colocar en if you are admin    iamadmin
            `)
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
                <label>Value per Ton</label>
                <input placeholder="Value per Ton" 
                type="number"
                id="valuePerTon"
                value={values.valuePerTon}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Form.Field className="form-field">
                <label>Weight in grams per cubic meter </label>
                <input placeholder="Grams per cubic Meter" 
                type="number"
                id="weightGcubicM"
                value={values.weightGcubicM}
                onChange={inputsHandler}
                />
            </Form.Field>
            <Button className="button-form" type='submit' onClick={postData} > Create </Button>
        </Form>
    </main>
    );

};

export default RawMaterial;