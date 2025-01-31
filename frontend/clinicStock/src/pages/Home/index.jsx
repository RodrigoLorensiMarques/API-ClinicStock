import { useState, useEffect } from 'react'
import SideBar from "../../components/sideBar";
import SearchField from "../../components/searchField";
import AddItemButton from "../../components/addItemButton";
import HeaderMaterial from "../../components/headerMaterial";
import MaterialList from "../../components/materialList";

import './style.css'

function App() {


  return (
    <>
      <div className="parent-container">
          <div>
              <SideBar />
          </div>
          <div className="dashboard-control">
              <SearchField />
              <div className="dashboard-content">
                  <h1>Material</h1>
                  <AddItemButton item="Material" />
              </div>
              <div className="dashboard-itemns">
                  <HeaderMaterial />
                  <MaterialList />
              </div>
          </div>
      </div>
    </>
  )
}
export default App
