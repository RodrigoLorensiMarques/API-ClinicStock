import { useState, useEffect } from 'react'
import SideBar from "../../components/sideBar";
import SearchField from "../../components/searchField";
import AddItemButton from "../../components/addItemButton";
import HeaderMaterial from "../../components/headerMaterial";
import MaterialList from "../../components/materialList";

import './style.css'

function App() {
  const [searchTerm, setSearchTerm] = useState("");


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
                  <AddItemButton item="Material" />
              </div>
              <div className="dashboard-itemns">
                  <HeaderMaterial />
                  <MaterialList searchTerm={searchTerm}/>
              </div>
          </div>
      </div>
    </>
  )
}
export default App
