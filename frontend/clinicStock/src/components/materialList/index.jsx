import React, { useState, useEffect } from "react"
import { getMaterials, deleteMaterial } from "../../services/api.js";
import AddMaterialForm from "../addMaterialForm";
import './style.css'

function MaterialList({ searchTerm }) {
  
    const [materials, setMaterials] = useState([]);
    const [erro, setErro] = useState(null);

    const loadMaterials = async () => {
        try {
            const data = await getMaterials();
            setMaterials(data);
        } catch (error) {
            setErro(error.message);
        }
    };

    const hendleDelete = async (id) => {
        try {
            await deleteMaterial(id);
            const updateItems = await getMaterials();
            setMaterials(updateItems);
        }
        catch (error) {
            setErro(error.message);
        }
    };

    useEffect(() => {
        loadMaterials();
    }, []);

    const filteredMaterials = materials.filter(material =>
        material.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div>
            {filteredMaterials.map((material) => (
            
            <div className="item-list">
                <label>{material.name}</label>
                <label>{material.id}</label>
                <label>{material.packaging}</label>
                <label>{material.amount}</label>

                <div className="container-buttons">
                    <button className="edit-icon"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onClick={() => hendleDelete(material.id)} className="trash-icon"><i class="fa-solid fa-trash"></i></button>
                </div>

            </div>
            ))}  
        </div>
    )
}
  export default MaterialList;