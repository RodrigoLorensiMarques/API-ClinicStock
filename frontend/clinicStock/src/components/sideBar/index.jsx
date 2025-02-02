import React, { useState, useEffect } from "react"
import healingIcon from "../../assets/healing.svg" 
import './style.css'

function SideBar() {
  
    return (

        <div class="side-bar">
            <div class="content">
                <h1>StockClinic</h1>
                <div className="links-items">
                    <a><img className="healingIcon" src={healingIcon} draggable="false" />Materiais</a> 
                    <a><span className="medicine-icon" ><i class="fa-solid fa-capsules"></i></span> Medicamentos</a>
                </div>
            </div>
        </div>
        
    )
}
  export default SideBar;