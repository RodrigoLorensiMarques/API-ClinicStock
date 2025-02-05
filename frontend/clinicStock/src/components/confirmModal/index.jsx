import { deleteMaterial } from "../../services/api.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {toastSuccessful} from "../../utils/toastUtils.js"
import './style.css'




function ConfirmModal({loadMaterials, isOpen, setOpenModalDelete}) {

    const handleDelete = async () => {
        try {
            await deleteMaterial(isOpen);
            toastSuccessful("Item removido com sucesso!");
            setOpenModalDelete(false);
            loadMaterials();
            
        }
        catch (error) {
            setErro(error.message);
        }
    };

  
    if (isOpen)
    {
        return (
            <div className="backgroud-modal">
                <div class="container-modal">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <p>Tem certeza que deseja <strong>remover</strong> este item?</p>
                    <div className="modal-buttons">
                        <button className="remove-button" onClick={() => handleDelete()}> <i class="fa-solid fa-trash"></i>Remover</button>
                        <button className="cancel-button" onClick={()=>setOpenModalDelete(false) } > <i class="fa-solid fa-xmark"></i>Cancelar</button>    
                    </div>
                </div>
            </div>
            
        )
    }
}
  export default ConfirmModal;