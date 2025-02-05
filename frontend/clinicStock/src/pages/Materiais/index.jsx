import { useState, useEffect } from 'react'
import SideBar from "../../components/sideBar/index.jsx";
import SearchField from "../../components/searchField/index.jsx";
import AddItemButton from "../../components/addItemButton/index.jsx";
import HeaderMaterial from "../../components/headerMaterial/index.jsx";
import MaterialList from "../../components/materialList/index.jsx";
import AddMaterialForm from "../../components/addMaterialForm/index.jsx";
import { getMaterials, addNewMaterial, editMaterial } from "../../services/api.js";

import './style.css'

const Materiais = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addButton, setAddButton] = useState(false);
  const [materials, setMaterials] = useState([]);

  const loadMaterials = async () => {
      try {
          const data = await getMaterials();
          setMaterials(data);
      } catch (error) {
          setErro(error.message);
      }
  };

  const handleAddMaterial  = async (dados) => {

    try {
        const response = await addNewMaterial(dados);
      
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
    await editMaterial(id, dados);
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
          <div className="dashboard-control">
              <SearchField setSearchTerm={setSearchTerm} />
              <div className="dashboard-content">
                  <h1>Material</h1>
            <AddItemButton item="Material" setAddButton={setAddButton} addButton={addButton}/>
              </div>
              <div className="dashboard-itemns">
                  <AddMaterialForm addButton={addButton} setAddButton={setAddButton} onAdd={handleAddMaterial}/>
                  <HeaderMaterial />
                  <MaterialList searchTerm={searchTerm} materials={materials} loadMaterials={loadMaterials} onEdit={handleEditMaterial}/>
              </div>
          </div>
      </div>
    </>
  )
}
export default Materiais
