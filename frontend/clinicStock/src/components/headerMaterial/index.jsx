import React, { useState, useEffect } from "react"
import './style.css'

function HeaderMaterial() {
  
    return (

        <div class="header-material">
            <label className="label-name">Nome</label>
            <label>ID Produto</label>
            <label>Tipo</label>
            <label>Quantidade</label>
        </div>
        
    )
}
  export default HeaderMaterial;