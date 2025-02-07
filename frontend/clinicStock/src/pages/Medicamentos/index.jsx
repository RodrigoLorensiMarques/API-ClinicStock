import { useState, useEffect } from 'react'
import SideBar from "../../components/sideBar/index.jsx";
import SearchField from "../../components/searchField/index.jsx";
import AddItemButton from "../../components/addItemButton/index.jsx";
import HeaderMaterial from "../../components/headerMaterial/index.jsx";
import MaterialList from "../../components/materialList/index.jsx";
import AddMaterialForm from "../../components/addMaterialForm/index.jsx";
import Footer from "../../components/footer/index.jsx";
import { getItems, addNewItem, editItem } from "../../services/api.js";

import './style.css'

const Medicamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addButton, setAddButton] = useState(false);
  const [materials, setMaterials] = useState([]);

  const itemRequest = "Medicine";

  const loadMaterials = async () => {
      try {
          const data = await getItems(itemRequest);
          setMaterials(data);
      } catch (error) {
          setErro(error.message);
      }
  };

  const handleAddMaterial  = async (dados) => {

    try {
        const response = await addNewItem(itemRequest,dados);
      
        if (response && response.success) {
            setMaterials((prevMaterials) => [...prevMaterials, dados]);
            loadMaterials();
          return { success: true };
        } 
        else {
          return { success: false, message: "Erro no servidor" };
        }

    } catch (error) {
      return { success: false, message: "Erro no servidor" };
    }
  }

  const handleEditMaterial = async (id, dados) => {
    await editItem(itemRequest,id, dados);
    loadMaterials();
  }
  
  useEffect(() => {
    loadMaterials();
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
                  <AddItemButton item="Medicamento" setAddButton={setAddButton} addButton={addButton}/>
              </div>
              <div className="dashboard-items">
                  <AddMaterialForm addButton={addButton} setAddButton={setAddButton} onAdd={handleAddMaterial}/>
                  <HeaderMaterial />
                  <MaterialList searchTerm={searchTerm} materials={materials} loadMaterials={loadMaterials} onEdit={handleEditMaterial} itemRequest={itemRequest}/>
              </div>
            </div> 
        </div>
      </div>
    </>
  )
}
export default Medicamentos
