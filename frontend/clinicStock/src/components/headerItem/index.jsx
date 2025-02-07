import React, { useState, useEffect } from "react"
import './style.css'

function HeaderItem({itemRequest}) {
  
    return (
        <div class="header-list" id={`${itemRequest === "Medicine" ? "header-medicine" : "header-material"}`}>
            <label className="label-name">Nome</label>
            <label>ID Produto</label>
            {itemRequest === "Medicine" ? (<label>Miligrama</label>) : null}
            <label>Tipo</label>
            <label>Quantidade</label>
        </div>
    )
}
  export default HeaderItem;