import React, { useState, useEffect } from "react"
import './style.css'

function ItemList({name, id, packaging, amount}) {
  
    return (

        <div className="item-list">
            <label>{name}</label>
            <label>{id}</label>
            <label>{packaging}</label>
            <label>{amount}</label>
        </div>
    )
}
  export default ItemList;