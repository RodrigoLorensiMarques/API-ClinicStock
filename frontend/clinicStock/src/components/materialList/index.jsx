import React, { useState, useEffect } from "react"
import trashIcon from "../../assets/trash.svg" 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastSuccessful } from "../../utils/toastUtils.js"
import ConfirmModal from "../confirmModal"
import EmptyStateList from "../emptyStateList/index.jsx"
import EmptyStateSearch from "../emptyStateSearch/index.jsx"
import './style.css'


function MaterialList({ searchTerm, materials, loadMaterials, onEdit, itemRequest }) {
    const [editingId, setEditingId] = useState(false);
    const [dados, setDados] = useState({ name: "", packaging: "", amount: "" }) 
    const [openModalDelete, setOpenModalDelete] = useState(null);

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
    



    const filteredMaterials = materials.filter(material =>
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (`#`+material.id.toString()).includes(searchTerm)
    );


    if (materials.length === 0) {
        return <EmptyStateList />;
    }
    
    if (filteredMaterials.length === 0) {
        return <EmptyStateSearch searchTerm={ searchTerm} />;
    }

    else {
        return (
            <div>
                {filteredMaterials.map((material) => (
                    <div>
                        {editingId === material.id ? (
                            <div className="item-list">
                                <input
                                    name="name"
                                    type="text"
                                    value={dados.name}
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
                                    value={dados.amount}
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
                                        onClick={() => setOpenModalDelete(material.id)}
                                        className="trash-icon">
                                        <i class="fa-solid fa-trash"></i>
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
                                            onClick={() => setOpenModalDelete(material.id)}
                                            className="trash-icon">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                    
                                </div>   
                            )}
                    </div>
                ))}  
                <ConfirmModal loadMaterials={loadMaterials} isOpen={openModalDelete} setOpenModalDelete={setOpenModalDelete} itemRequest={itemRequest} />
                <ToastContainer />
            </div>
        )
    }


    
}
  export default MaterialList;