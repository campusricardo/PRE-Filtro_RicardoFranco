import React from "react";



const Commoditie = ({id, name})  => {
    return (
    <option value={id}>
        {name}
    </option>)
};  

export default Commoditie;