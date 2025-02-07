import React, { useState, useEffect } from "react"
import './style.css'

function HeaderMaterial({item}) {
  
    return (
        <div class="header-list" id={`${item === "Medicine" ? "header-medicine" : "header-material"}`}>
            <label className="label-name">Nome</label>
            <label>ID Produto</label>
            {item === "Medicine" ? (<label>Miligrama</label>) : null}
            <label>Tipo</label>
            <label>Quantidade</label>
        </div>
    )
}
  export default HeaderMaterial;