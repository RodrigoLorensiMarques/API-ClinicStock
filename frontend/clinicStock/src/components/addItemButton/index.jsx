import React, { useState, useEffect } from "react"
import './style.css'

function AddItemButton({ item, setAddMaterial, addMaterial }) {
    
    if (!addMaterial) {
        return (
            <div className="add-item-button">
                <button
                    onClick={() => setAddMaterial(true)}>
                    <strong>+</strong> Add {item}
                </button>
            </div>
        )
    }
  

}
  export default AddItemButton;