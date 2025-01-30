import { useState, useEffect } from 'react'
import axios from 'axios'

function GetMaterials() {

    const [data, setData] = useState(null)
    useEffect(() => {
      axios.get("http://localhost:5124/Material/GetAll")
          .then((Response) => {
              setData(Response.data);
          })
          
          .catch(() => {
              console.log("Error")
          })
    }, [])
    
    return data;
 }
export default GetMaterials