import { useState, useEffect } from 'react'
import SideBar from "../../components/sideBar";
import SearchField from "../../components/searchField";
import AddItemButton from "../../components/addItemButton";
import HeaderMaterial from "../../components/headerMaterial";
import ItemList from "../../components/itemList";
import GetMaterials from "../../services/servGetMaterials.js";
import axios from 'axios'

import './style.css'

function App() {

  const data = GetMaterials();

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
                  {data && data.map((item) => (
                  <div>
                      <ItemList name={item.name} id={item.id} packaging={item.packaging} amount={item.amount} />
                  </div>
                  ) )}
              </div>
          </div>
      </div>
    </>
  )
}
export default App
