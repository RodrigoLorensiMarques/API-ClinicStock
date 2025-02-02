import React, { useState, useEffect } from "react"
import {deleteMaterial} from "../../services/api.js";
import trashIcon from "../../assets/trash.svg" 

import './style.css'

function MaterialList({ searchTerm, materials, loadMaterials, onEdit }) {
    const [editingId, setEditingId] = useState(false);
    const [dados, setDados] = useState({ name: "", packaging: "", amount: "" })  

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
            loadMaterials()
        }
        catch (error) {
            setErro(error.message);
        }
    };

    const filteredMaterials = materials.filter(material =>
        material.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                                placeholder={material.name}
                                maxLength={40}
                                onChange={handleChange}
                            />
                            <label>{material.id}</label>
                            <input
                                name="packaging"
                                type="text"
                                placeholder={material.packaging}
                                className="input-packaging"
                                onChange={handleChange}
                            />
                            <input
                                name="amount"
                                type="number"
                                placeholder={material.amount}
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
                                    <img src={trashIcon} alt="trashIcon" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="item-list">
                            <label><strong>{material.name}</strong></label>
                            <label>{material.id}</label>
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
                                        <img src={trashIcon} alt="trashIcon" />
                                    </button>
                            </div>
                         </div>
                    )}
                </div>
            ))}  
        </div>
    )
}
  export default MaterialList;