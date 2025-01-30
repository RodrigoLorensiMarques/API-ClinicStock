import React, { useState, useEffect } from "react"
import DeleteMaterial from "../../services/servDeleteMaterials.js";
import './style.css'

function ItemList({name, id, packaging, amount}) {
  
    return (

        <div className="item-list">
            <label>{name}</label>
            <label>{id}</label>
            <label>{packaging}</label>
            <label>{amount}</label>

            <div className="container-buttons">
                <button className="edit-icon"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onClick={() => DeleteMaterial(id)} className="trash-icon"><i class="fa-solid fa-trash"></i></button>
            </div>

        </div>
    )
}
  export default ItemList;