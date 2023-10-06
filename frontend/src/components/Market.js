import React, {useState, useEffect} from 'react';
import {Button, Form} from 'semantic-ui-react';
import axios from 'axios';
import Commoditie from './Commoditie';

const Market = () => {
    const [rawMaterials, setRawMaterials] = useState([]);
    const [getPortafolio, setGetPortafolio] = useState([]);
    const [] = useState([]);
    const [portafolios, setPortafolios] = useState({
        materialId: '',
        weightInKilos: ''});
    useEffect(()=> {
        setPortafolios({
            materialId: document.getElementById('materialId').value,
            weightInKilos: ''
        })
        console.log(portafolios);
        axios.get('http://localhost:4000/api/raw-materials', {
            headers: { "apiJWT": localStorage.getItem('api-token') }
        }).then((response) =>{
            setRawMaterials(response.data.result.rawMaterials);
            console.log(rawMaterials);
        }).catch((error)=> {
            console.log(error);
            alert('Debes loguearte Primero')
        });

        axios.get('http://localhost:4000/api/portafolios',
        {headers: { "apiJWT": localStorage.getItem('api-token') }}
        ).then((res)=> {
            setGetPortafolio(res.data.result.portafolio.commodities);
        }).catch((err)=> {
            alert('Please log In');
        });

    }, []);

    const buyRawMaterial = () => {
        axios.post(`http://localhost:4000/api/portafolios/${portafolios.materialId}`, {weightInKilos: Number(portafolios.weightInKilos)}, {
            headers: { "apiJWT": localStorage.getItem('api-token') }
        }).then((res) => {
            alert('Commoditie Comprado Correctamente')
        }).catch((error)=> {
            console.log(error);
            alert('Logueate o llena los campos restantes')
        });
    };
    const inputsHandlers = (e) => {
        
        setPortafolios((prev)=> {
            return {...prev, [e.target.id]: e.target.value}
        });
        console.log(portafolios);
    };
    return (
        <main className="main"> 
            <Form className="from-container">
            <div className="div-top"> <h2> Buy a Raw Material</h2> </div>
            <Form.Field className="form-field">
            <label> Select the Raw Material </label>
            <select id="materialId" onChange={inputsHandlers} value={portafolios.materialId}>
                <option value="xd"> Select an Option</option>
                {rawMaterials.map((e)=> <Commoditie id={e._id} name={e.name} />)}
            </select>
            </Form.Field>
            <Form.Field className="form-field">
            <label> Put the weight in Kilos</label>
            <input type='number' id='weightInKilos' onChange={inputsHandlers} value={portafolios.weightInKilos} placeholder='Weight'></input>
            </Form.Field>
            <Button className='button-form' onClick={buyRawMaterial}> Buy Raw Material</Button>
            </Form>
            <article>
                {
                    getPortafolio.map((e)=>(
                    <section>
                        <p>materialId: {e.materialId}</p>
                        <p>weightInKilos: {e.weightInKilos}</p>
                        <p>value: {e.value}</p>
                    </section>
                    ))
                }
            </article>
        </main>
    )



}

export default Market;