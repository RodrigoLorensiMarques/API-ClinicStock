import React, { useState, useEffect } from "react"
import healingIcon from "../../assets/healing.svg" 
import { Link } from 'react-router-dom';
import './style.css'

function SideBar() {
  
    return (
        <div class="side-bar">
            <div class="content-sideBar">
                <h1>ClinicStock</h1>
                <div className="links-items">
                    <Link to="/"><img className="healingIcon" src={healingIcon} draggable="false" />Materiais</Link> 
                    <Link to="/medicamentos"><span className="medicine-icon" ><i class="fa-solid fa-capsules"></i></span> Medicamentos</Link>
                </div>
            </div>
        </div>
        
    )
}
  export default SideBar;