import React, { useState, useEffect } from "react"
import './style.css'

function AddItemButton({ item, setAddButtonm, addButton }) {
    
    if (!addButton) {
        return (
            <div className="add-item-button">
                <button
                    onClick={() => setAddButton(true)}>
                    <strong>+</strong> Add {item}
                </button>
            </div>
        )
    }
  

}
  export default AddItemButton;