import React, { useState, useEffect } from "react"
import './style.css'

function AddItemButton({ itemRequest, setAddButton, addButton }) {
    
    if (!addButton) {
        return (
            <div className="add-item-button">
                <button
                    onClick={() => setAddButton(true)}>
                    <i class="fa-solid fa-plus"></i> Add {itemRequest}
                </button>
            </div>
        )
    }
  

}
  export default AddItemButton;