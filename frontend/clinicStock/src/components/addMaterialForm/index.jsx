import React, { useState, useEffect } from "react"
import './style.css'

function AddMaterialForm() {
  
    return (

        <div class="add-material-form">
            <div className="form-container-input">
                <input className="input-name" type="text" placeholder="Nome" />
                <input className="input-unit" type="text" placeholder="Unidade" />
                <input className="input-amount" type="number" placeholder="Qtd" />
            </div>

            <div className="form-container-buttons">
                <button className="add-button">+ Adicionar</button>
                <button className="cancel-button">X Cancelar</button>
            </div>

        </div>
        
    )
}
  export default AddMaterialForm;