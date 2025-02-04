import React, { useState, useEffect } from "react"
import { addNewMaterial } from "../../services/api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css'

function AddMaterialForm({ addButton, setAddButton, onAdd }) {
    const [dados, setDados] = useState({ name: "", packaging: "", amount: "" })   

    const toastSuccessful = () => {
        toast.success("Item adicionado com sucesso!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
    };
    

    const toastError = () => {
        toast.error("Não foi possível adicionar o item.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      };
    
    const handleChange = (e) => {
        setDados({ ...dados, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await onAdd(dados);
            console.log(response);
    

            if (response.success === true) {
                toastSuccessful()
            }
            else {
                toastError()
            }
    
        } catch (error) {
            console.error("Erro ao adicionar o item:", error);
        }
    };
    


    if (addButton)
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
                    <select
                        className="select-type"
                        name="packaging"
                        value={dados.packaging}
                        onChange={handleChange}>
                        
                        <option value="Unidade">Unidade</option>
                        <option value="Rolo">Rolo</option>
                        <option value="Pacote">Pacote</option>
                        <option value="Caixa">Caixa</option>
                    </select>


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
                        onClick={() => { setAddButton(false) }}
                        className="cancel-button">X Cancelar
                    </button>
                    <ToastContainer />

                </div>
    
            </div>  
        )
    }
}
  export default AddMaterialForm;