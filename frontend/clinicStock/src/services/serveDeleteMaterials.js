import axios from 'axios'

function DeleteMaterial(id) {

    axios.delete("http://localhost:5124/Material/"+id)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log("Error",error)
        });
 }
export default DeleteMaterial