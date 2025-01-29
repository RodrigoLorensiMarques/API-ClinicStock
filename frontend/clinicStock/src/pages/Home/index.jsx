import { useState, useEffect } from 'react'
import ItemList from "../../components/itemList";
import axios from 'axios'

import './style.css'

function App() {

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

  return (
    <>
        <div>
            {data && data.map((item) => (
                <div>
                    <p>{item.name} {item.packaging} {item.amount}</p>
                </div>
                )
            )}
        </div>
      

      <ItemList />
    </>
  )
}

export default App
