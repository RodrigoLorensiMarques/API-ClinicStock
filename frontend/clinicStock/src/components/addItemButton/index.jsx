import React, { useState, useEffect } from "react"
import './style.css'

function AddItemButton({item}) {
  
    return (

        <div className="add-item-button">
            <button> <strong>+</strong> Add { item}</button>
        </div>
    )
}
  export default AddItemButton;