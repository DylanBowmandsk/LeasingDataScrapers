import { useState } from "react"
import { useEffect } from "react"

const AdminEditor = ({setMake, setModel, setVariant}) => {

    useEffect(() => {
        populateMakeFields()
    },[])

    return (
        <div id="editor-container" className="w-1/3 mx-auto mt-80">
            <div id="make-container">
              <select className="w-full mr-10 rounded" name="make" id="make" onChange={e => {populateModelFields(e.target.value , setMake)}}>
                <option value="">Brand</option>
              </select>
            </div>
            <div id="model-container">
            <select className="w-full my-5" name="model" id="model" onChange={e => {populateVariantsFields(e.target.value, setModel)}}>
              <option value="">Model</option>
            </select>
            </div>
            <div id="variant-container">
            <select className="w-full" name="Variant" id="variant" onChange={e => {setVariant(e.target.value)}}>
              <option value="">Variant</option>
            </select>
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 m-5 rounded mr-2">Add</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 m-5 rounded mr-2">Edit</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 m-5 rounded mr-2">Delete</button></div>
            </div>
        </div>
    )
}


//makes api call and fills out input fields of all brands we have in stock
const populateMakeFields = () => {
    let selector = document.getElementById("make")
    fetch("http://localhost:5000/get/makes")
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        const option = document.createElement("option")
        option.innerHTML = element.makeName
        option.value = JSON.stringify(element)
        selector.appendChild(option)
      });
    })
}

//makes api call to populate the models of the previously selected brand input
const populateModelFields = (makeString, setMake) => {
  let make = JSON.parse(makeString)
  setMake(make)
  let selector = document.getElementById("model")
  selector.innerHTML = ""
  const option = document.createElement("option")
  option.innerHTML = "Model"
  selector.appendChild(option)

  fetch("http://localhost:5000/get/models")
  .then(response => response.json())
  .then(data => {
    data.forEach((element) => {
      if(make.makeID === element.makeID){
      const option = document.createElement("option")
      option.innerHTML = element.modelName
      option.value = JSON.stringify(element)
      selector.appendChild(option)
      }
    });
  })
}

//makes api call and fills out input fields of all model variants we have in stock
const populateVariantsFields = (modelString, setModel) => {
    let model = JSON.parse(modelString)
    setModel(model)
    let selector = document.getElementById("variant")
    selector.innerHTML = ""
    const option = document.createElement("option")
    option.innerHTML = "Variant"
    selector.appendChild(option)
  
    fetch("http://localhost:5000/get/variants")
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        if(model.modelID === element.ModelID){
        const option = document.createElement("option")
        option.innerHTML = element.modelTrim
        option.value = element.modelTrim
        selector.appendChild(option)
        }
      });
    })
  }


export default AdminEditor