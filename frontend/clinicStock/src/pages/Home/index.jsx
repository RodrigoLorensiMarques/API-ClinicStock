import { useState, useEffect } from 'react'
import SideBar from "../../components/sideBar";
import SearchField from "../../components/searchField";
import AddItemButton from "../../components/addItemButton";
import HeaderMaterial from "../../components/headerMaterial";
import MaterialList from "../../components/materialList";
import AddMaterialForm from "../../components/addMaterialForm";


import './style.css'

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [addMaterial, setAddMaterial] = useState(false);
  const [addNewMaterial, setNewAddMaterial] = useState(false);


  return (
    <>
      <div className="parent-container">
          <div>
              <SideBar />
          </div>
          <div className="dashboard-control">
              <SearchField setSearchTerm={setSearchTerm} />
              <div className="dashboard-content">
                  <h1>Material</h1>
            <AddItemButton item="Material" setAddMaterial={setAddMaterial} addMaterial={addMaterial} />
              </div>
              <div className="dashboard-itemns">
                  <AddMaterialForm addMaterial={addMaterial} setAddMaterial={setAddMaterial}/>
                  <HeaderMaterial />
                  <MaterialList searchTerm={searchTerm}/>
              </div>
          </div>
      </div>
    </>
  )
}
export default App
