 import axios from 'axios';
 import GetMaterials from "./servGetMaterials.js";

 async function DeleteMaterial(id) {
     try {
         const response = await axios.delete(`http://localhost:5124/Material/${id}`);
         console.log(response.data);
         await GetMaterials();
    } catch (error) {
         console.log("Error", error);
     }
 }

 export default DeleteMaterial;



