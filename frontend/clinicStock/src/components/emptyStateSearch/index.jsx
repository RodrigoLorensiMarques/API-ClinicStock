import emptySearch from "../../assets/images/emptySearch.png" 
import './style.css'

function EmptyStateList({searchTerm , itemRequest}) {
    
    const item =  itemRequest === "Medicine" ? "medicamento" : "material"

    return (
        <div className="emptyState-container">
            <h1>Nenhum {item} com <strong>"{ searchTerm}"</strong> econtrado</h1>
            <p>Tente pesquisando com outro termo.</p>
            <img
                className="empty-box"
                src={emptySearch}
                alt="emptyBox"
            />
        </div>
    )
    
  
}
  export default EmptyStateList;