import React, { useState, useEffect } from "react"
import {deleteMaterial} from "../../services/api.js";
import trashIcon from "../../assets/trash.svg" 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css'


function MaterialList({ searchTerm, materials, loadMaterials, onEdit }) {
    const [editingId, setEditingId] = useState(false);
    const [dados, setDados] = useState({ name: "", packaging: "", amount: "" })  

    const toastSuccessful = () => {
        toast.success("Item removido com sucesso!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    };

    useEffect(() => {
        if (editingId) {
            const materialToEdit = materials.find(material => material.id === editingId);

            if (materialToEdit) {
                setDados({
                    name: materialToEdit.name,
                    packaging: materialToEdit.packaging,
                    amount: materialToEdit.amount
                });
            }
        }
    }, [editingId, materials]);
    

    const handleChange = (e) => {
        setDados(prevDados => ({...prevDados, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (id) => {
        try {
            await onEdit(id, dados);
        }

        catch (error){
            console.log(error);
        }
    };

    const handleClickCheck = (id) => {
        handleSubmit(id);
        setEditingId(false);
    }
    

    const hendleDelete = async (id) => {
        try {
            await deleteMaterial(id);
            toastSuccessful();
            loadMaterials();
            
        }
        catch (error) {
            setErro(error.message);
        }
    };

    const filteredMaterials = materials.filter(material =>
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (`#`+material.id.toString()).includes(searchTerm)
    );




    return (
        <div>
            {filteredMaterials.map((material) => (
                <div>
                    {editingId === material.id ? (
                        <div className="item-list">
                            <input
                                name="name"
                                type="text"
                                value={material.name}
                                maxLength={40}
                                onChange={handleChange}
                            />
                            <label>#{material.id}</label>

                            <select
                                className="select-type-edit"
                                name="packaging"
                                value={dados.packaging}
                                onChange={handleChange}>
                                
                                <option value="Unidade">Unidade</option>
                                <option value="Rolo">Rolo</option>
                                <option value="Pacote">Pacote</option>
                                <option value="Caixa">Caixa</option>
                            </select>

                            <input
                                name="amount"
                                type="number"
                                value={material.amount}
                                className="input-amout"
                                onChange={handleChange}
                            />
    
                            <div className="container-buttons">
                                <button
                                    onClick={() => handleClickCheck(material.id)}
                                    className="check-icon">
                                    <i class="fa-solid fa-check"></i>
                                </button>
                                <button
                                    onClick={() => hendleDelete(material.id)}
                                    className="trash-icon">
                                    <img src={trashIcon} alt="trashIcon" draggable='false'/>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="item-list">
                            <label><strong>{material.name}</strong></label>
                            <label>#{material.id}</label>
                            <label>{material.packaging}</label>
                            <label>{material.amount}</label>
        
                            <div className="container-buttons">
                                    <button
                                        onClick={() => setEditingId(material.id)}
                                        className="edit-icon">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        onClick={() => hendleDelete(material.id)}
                                        className="trash-icon">
                                        <img src={trashIcon} alt="trashIcon" draggable='false'/>
                                    </button>
                            </div>
                         </div>
                    )}
                </div>
            ))}  
            <ToastContainer />
        </div>
    )
}
  export default MaterialList;