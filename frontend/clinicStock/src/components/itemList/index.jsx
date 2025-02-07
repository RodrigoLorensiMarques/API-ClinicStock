import React, { useState, useEffect } from "react"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastSuccessful } from "../../utils/toastUtils.js"
import ConfirmModal from "../confirmModal/index.jsx"
import EmptyStateList from "../emptyStateList/index.jsx"
import EmptyStateSearch from "../emptyStateSearch/index.jsx"
import TypeOptionsMaterials from "../typeOptionsMaterials/index.jsx"
import TypeOptionsMedicines from "../typeOptionsMedicines/index.jsx"
import './style.css'


function ItemList({ searchTerm, items, loadItems, onEdit, itemRequest }) {
    const [editingId, setEditingId] = useState(false);
    const [dados, setDados] = useState({ name: "", packaging: "", milligram:"", amount: "" }) 
    const [openModalDelete, setOpenModalDelete] = useState(null);

    useEffect(() => {
        if (editingId) {
            const itemToEdit = items.find(item => item.id === editingId);

            if (itemToEdit) {
                setDados({
                    name: itemToEdit.name,
                    packaging: itemToEdit.packaging,
                    milligram: itemToEdit.milligram,
                    amount: itemToEdit.amount
                });
            }
        }
    }, [editingId, items]);
    

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
    


    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (`#`+item.id.toString()).includes(searchTerm)
    );


    if (items.length === 0) {
        return <EmptyStateList itemRequest={itemRequest}/>;
    }
    
    if (filteredItems.length === 0) {
        return <EmptyStateSearch searchTerm={ searchTerm} itemRequest={itemRequest}/>;
    }

    else {
        return (
            <div>
                {filteredItems.map((item) => (
                    <div>
                        {editingId === item.id ? (
                             <div className= "item-list" id={`${itemRequest === "Medicine" ? "item-medicine" : "item-material"}`}>
                                <input
                                    name="name"
                                    type="text"
                                    value={dados.name}
                                    maxLength={40}
                                    onChange={handleChange}
                                />
                                <label>#{item.id}</label>

                                {itemRequest === "Medicine" ?
                                    <input
                                        name="milligram"
                                        className="input-milligram"
                                        type="number"
                                        placeholder="mg"
                                        value={dados.milligram}
                                        onChange={handleChange}
                                    /> : null}
    
                                <select
                                    className="select-type-edit"
                                    name="packaging"
                                    value={dados.packaging}
                                    onChange={handleChange}>
                                    
                                    {itemRequest === "Medicine" ? <TypeOptionsMedicines /> : <TypeOptionsMaterials />}
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
                                        onClick={() => handleClickCheck(item.id)}
                                        className="check-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </button>
                                    <button
                                        onClick={() => setOpenModalDelete(item.id)}
                                        className="trash-icon">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className= "item-list" id={`${itemRequest === "Medicine" ? "item-medicine" : "item-material"}`}>
                                <label><strong>{item.name}</strong></label>
                                <label>#{item.id}</label>
                                {itemRequest === "Medicine" ? (<label>{item.milligram}</label>) : null}
                                <label>{item.packaging}</label>
                                <label>{item.amount}</label>
            
                                <div className="container-buttons">
                                        <button
                                            onClick={() => setEditingId(item.id)}
                                            className="edit-icon">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            onClick={() => setOpenModalDelete(item.id)}
                                            className="trash-icon">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                    
                                </div>   
                            )}
                    </div>
                ))}  
                <ConfirmModal loadItems={loadItems} isOpen={openModalDelete} setOpenModalDelete={setOpenModalDelete} itemRequest={itemRequest} />
                <ToastContainer />
            </div>
        )
    }


    
}
  export default ItemList;