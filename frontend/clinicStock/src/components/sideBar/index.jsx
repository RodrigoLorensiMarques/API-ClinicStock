import React, { useState, useEffect } from "react"
import './style.css'

function SideBar() {
  
    return (

        <div class="side-bar">
            <div class="content">
                <h1>StockClinic</h1>
                <div className="links-items">
                    <a href="#">Materiais</a>
                    <a href="#">Medicamentos</a>
                </div>
            </div>
        </div>
        
    )
}
  export default SideBar;