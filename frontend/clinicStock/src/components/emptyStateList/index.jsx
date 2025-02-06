import emptyBox from "../../assets/images/emptyBox.png" 
import './style.css'

function EmptyStateList() {
    

    return (
        <div className="emptyState-container">
            <h1>Nada em estoque no momento</h1>
            <p>Adicione novos materiais para começar a gestão do estoque.</p>
            <img
                className="empty-box"
                src={emptyBox}
                alt="emptyBox"
            />
        </div>
    )
    
  
}
  export default EmptyStateList;