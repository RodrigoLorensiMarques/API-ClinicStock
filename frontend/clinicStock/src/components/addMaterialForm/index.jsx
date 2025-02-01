import React, { useState, useEffect } from "react"
import { addNewMaterial } from "../../services/api.js";
import './style.css'

function AddMaterialForm({ addMaterial, setAddMaterial, onAdd }) {
    const [dados, setDados] = useState({ name: "", packaging: "", amount: "" })   
    
    const handleChange = (e) => {
        setDados({ ...dados, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        await onAdd(dados);
    };

    if (addMaterial)
    {
        return (
            <div class="add-material-form">
                <div className="form-container-input">
                    <input
                        className="input-name"
                        type="text" placeholder="Nome"
                        maxLength={40}
                        name="name"
                        value={dados.name}
                        onChange={handleChange}
                    />
                    <input
                        className="input-unit"
                        type="text"
                        placeholder="Unidade"
                        maxLength={20}
                        name="packaging"
                        value={dados.packaging}
                        onChange={handleChange}
                    />
                    <input
                        className="input-amount"
                        type="number"
                        placeholder="Qtd"
                        name="amount"
                        value={dados.amount}
                        onChange={handleChange}
                    />
                </div>
    
                <div className="form-container-buttons">
                    <button
                        onClick={handleSubmit}
                        className="add-button">+ Adicionar
                    </button>

                    <button
                        onClick={() => { setAddMaterial(false) }}
                        className="cancel-button">X Cancelar
                    </button>

                </div>
    
            </div>  
        )
    }
}
  export default AddMaterialForm;