import React, { useState, useEffect } from "react"
import './style.css'

function SearchField() {
  
    return (

        <div class="search-field">

            <input className="field" type="text" placeholder="Pesquisar" maxLength={70}/>

        </div>
        
    )
}
  export default SearchField;