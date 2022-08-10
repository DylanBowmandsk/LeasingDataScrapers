import { useState, useEffect } from "react"
import AdminEditor from "./AdminEditor"

const AdminPage = () => {

    const [make, setMake] = useState()
    const [model, setModel] = useState()
    const [variant, setVariant] = useState()
    const [carList, setCarList] = useState()

    useEffect(() => {
      populateMakeFields(setCarList)
    },[])


    return(
        <div>
            <AdminEditor carList={carList}/>
        </div>
    )
}


//makes api call and fills out input fields of all brands we have in stock
const populateMakeFields = (setCarList) => {
    let selector = document.getElementById("editor-container")
    fetch("http://localhost:5000/get/makes")
    .then(response => response.json())
    .then(data => {
      setCarList(data)
      data.forEach(element => {
        const option = document.createElement("div")
        option.innerHTML = element.make
        selector.appendChild(option)
      });
    })
}

export default AdminPage