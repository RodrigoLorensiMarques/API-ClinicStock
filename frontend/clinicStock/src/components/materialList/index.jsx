import React, { useState, useEffect } from "react"
import { getMaterials, deleteMaterial } from "../../services/api.js";
import trashIcon from "../../assets/trash.svg" 
import AddMaterialForm from "../addMaterialForm";
import './style.css'

function MaterialList({ searchTerm, materials, loadMaterials }) {
    const [editingId, setEditingId] = useState(false);
    

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
                                type="text"
                                placeholder={material.name}
                                maxLength={40}
                            />
                            <label>{material.id}</label>
                            <input
                                type="text"
                                placeholder={material.packaging}
                                className="input-packaging"
                            />
                            <input
                                type="number"
                                placeholder={material.amount}
                                className="input-amout"
                            />
    
                            <div className="container-buttons">
                                <button
                                    onClick={() => setEditingId(false)}
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