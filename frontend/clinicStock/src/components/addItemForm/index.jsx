import React, { useState, useEffect } from "react"
import "react-toastify/dist/ReactToastify.css";
import { toastSuccessful, toastError } from "../../utils/toastUtils.js"
import TypeOptionsMaterials from "../typeOptionsMaterials/index.jsx"
import TypeOptionsMedicines from "../typeOptionsMedicines/index.jsx"

import './style.css'

function AddItemForm({ addButton, setAddButton, onAdd, itemRequest}) {
    const [dados, setDados] = useState({ name: "", milligram: "", packaging: "Unidade", amount: "" })   
    const [isVisible, setIsVisible] = useState(addButton)
    
    useEffect(() => {
        if (!addButton) {
            setTimeout(() => setIsVisible(false), 200);
        } else {
            setIsVisible(true)
        }
    }, [addButton]);
    
    const handleChange = (e) => {
        setDados({ ...dados, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await onAdd(dados);
            setDados({ name: "", milligram: "", packaging: "Unidade", amount: "" });
            console.log(response);
    

            if (response.success === true) {
                toastSuccessful("Item adicionado com sucesso!")
            }
            else {
                toastError("Não foi possível adicionar o item!")
            }
    
        } catch (error) {
            console.error("Erro ao adicionar o item:", error);
        }
    };
    

    if (!isVisible) return null;
    
        return (
            <div className={`add-material-form ${!addButton ? "moveOut" : "moveUp"}`}>
                <div className="form-container-input">
                    <input
                        className="input-name"
                        type="text" placeholder="Nome"
                        maxLength={40}
                        value={dados.name}
                        name="name"
                        onChange={handleChange}
                    />
                    <select 
                        className="select-type"
                        name="packaging"
                        onChange={handleChange}>
                        
                        {itemRequest === "Medicine" ? <TypeOptionsMedicines /> : <TypeOptionsMaterials />}

                    </select>

                    {itemRequest === "Medicine" ?
                        <input
                            className="input-milligram"
                            type="number"
                            value={dados.milligram}
                            placeholder="mg"
                            name="milligram"
                            onChange={handleChange}
                        /> : null}

                    <input
                        className="input-amount"
                        type="number"
                        placeholder="Qtd"
                        value={dados.amount}
                        name="amount"
                        onChange={handleChange}
                    />
                </div>
    
                <div className="form-container-buttons">
                    <button
                        onClick={handleSubmit}
                        className="add-button">
                        <i class="fa-solid fa-plus"></i> Adicionar
                    </button>

                    <button
                        onClick={() => { setAddButton(false) }}
                        className="cancel-button"><i class="fa-solid fa-xmark"></i> Cancelar
                    </button>
                </div>
            </div>  
        )
    
}
  export default AddItemForm;