import React, { useState, useEffect } from "react"

function ItemList({name, packaging, amount}) {
  
    return (

        <div>
            <label>{name}</label>
            <label>{packaging}</label>
            <label>{amount}</label>
        </div>
    )
}
  export default ItemList;