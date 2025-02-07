import emptyBox from "../../assets/images/emptyBox.png" 
import './style.css'

function EmptyStateList({ itemRequest }) {
    
   const item =  itemRequest === "Medicine" ? "medicamentos" : "materiais"

    return (
        <div className="emptyState-container">
            <h1>Nada em estoque no momento</h1>
            <p>Adicione novos {item} para começar a gestão do estoque.</p>
            <img
                className="empty-box"
                src={emptyBox}
                alt="emptyBox"
            />
        </div>
    )
}
  export default EmptyStateList;