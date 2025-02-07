import { useState, useEffect } from 'react'
import SideBar from "../../components/sideBar/index.jsx";
import SearchField from "../../components/searchField/index.jsx";
import AddItemButton from "../../components/addItemButton/index.jsx";
import HeaderItem from "../../components/headerItem/index.jsx";
import ItemList from "../../components/itemList/index.jsx";
import AddItemForm from "../../components/addItemForm/index.jsx";
import Footer from "../../components/footer/index.jsx";
import { getItems, addNewItem, editItem } from "../../services/api.js";

import './style.css'

const Medicamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addButton, setAddButton] = useState(false);
  const [items, setItems] = useState([]);

  const itemRequest = "Medicine";

  const loadItems = async () => {
      try {
          const data = await getItems(itemRequest);
          setItems(data);
      } catch (error) {
          setErro(error.message);
      }
  };

  const handleAddItem  = async (dados) => {

    try {
        const response = await addNewItem(itemRequest,dados);
      
        if (response && response.success) {
            setItems((prevItems) => [...prevItems, dados]);
            loadItems();
          return { success: true };
        } 
        else {
          return { success: false, message: "Erro no servidor" };
        }

    } catch (error) {
      return { success: false, message: "Erro no servidor" };
    }
  }

  const handleEditItem = async (id, dados) => {
    await editItem(itemRequest,id, dados);
    loadItems();
  }
  
  useEffect(() => {
    loadItems();
  }, []);


  return (
    <>
      <div className="parent-container">
        <div className='container-SideBar'>
            <SideBar />
        </div>
        <div className='content-container'>
            <div className="dashboard-control">
              <SearchField setSearchTerm={setSearchTerm} />
              <div className="dashboard-content">
                  <h1>Medicamentos</h1>
                  <AddItemButton itemRequest="Medicamento" setAddButton={setAddButton} addButton={addButton}/>
              </div>
              <div className="dashboard-items">
                  <AddItemForm addButton={addButton} setAddButton={setAddButton} onAdd={handleAddItem} itemRequest={itemRequest}/>
                  <HeaderItem item={itemRequest} />
                  <ItemList searchTerm={searchTerm} items={items} loadItems={loadItems} onEdit={handleEditItem} itemRequest={itemRequest}/>
              </div>
            </div> 
        </div>
      </div>
    </>
  )
}
export default Medicamentos
