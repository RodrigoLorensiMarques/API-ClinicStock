import React, { useState, useEffect } from "react"
import healingIcon from "../../assets/healing.svg" 
import { Link, useLocation } from 'react-router-dom';
import './style.css'



function SideBar() {
    const location = useLocation();
    const [currentRouth, setCurrentRouth] = useState(location.pathname);

    useEffect(() => {
    setCurrentRouth(location.pathname);
}, [location]);
  
    return (
        <div class="side-bar">
            <div class="content-sideBar">
                <h1>ClinicStock</h1>
                <div className="links-items">
                    <Link>
                        <img
                            className="healingIcon"
                            src={healingIcon} draggable="false" />
                        <span
                            className={`${currentRouth === "/" ? "current-routh" : ""}`} to="/">Materiais
                        </span>
                    </Link> 

                    <Link to="/medicamentos">
                        <span className="medicine-icon" >
                            <i class="fa-solid fa-capsules"></i>
                        </span>

                        <span
                            className={`${currentRouth === "/medicamentos" ? "current-routh" : ""}`} to="/">Medicamentos
                        </span>
                    </Link>
                </div>
            </div>
        </div>
        
    )
}
  export default SideBar;