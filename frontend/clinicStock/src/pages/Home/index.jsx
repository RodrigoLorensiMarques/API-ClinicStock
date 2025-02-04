import { useState, useEffect } from 'react'
import SideBar from "../../components/sideBar";
import SearchField from "../../components/searchField";
import AddItemButton from "../../components/addItemButton";
import HeaderMaterial from "../../components/headerMaterial";
import MaterialList from "../../components/materialList";
import AddMaterialForm from "../../components/addMaterialForm";
import { getMaterials, addNewMaterial, editMaterial } from "../../services/api.js";

import './style.css'

function App() {
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
    await addNewMaterial(dados);
    setMaterials((prevMaterials) => [...prevMaterials, dados]);
    loadMaterials();
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
export default App
