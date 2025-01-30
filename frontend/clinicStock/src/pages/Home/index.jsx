import { useState, useEffect } from 'react'
import ItemList from "../../components/itemList";
import SideBar from "../../components/sideBar";
import SearchField from "../../components/searchField";
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
        
      {/* <div>
            {data && data.map((item) => (
                <div>
                  <ItemList name={item.name} packaging = {item.packaging} amount={item.amount} />
              </div>
                )
            )}
      </div> */}

      <div className='container'>
        <SideBar />
        <SearchField/>
      </div>


    </>
  )
}

export default App
