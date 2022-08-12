import { useState } from "react"
import { useEffect } from "react"

const AdminEditor = ({setMake, setModel, setVariant}) => {

    useEffect(() => {
        populateMakeFields()
    })

    return (
        <div id="editor-container" className="h-96 overflow-y-scroll">
            <div id="make-container"></div>
            <div id="model-container"></div>
        </div>
    )
}


//makes api call and fills out input fields of all brands we have in stock
const populateMakeFields = () => {
    let selector = document.getElementById("make-container")
    fetch("http://localhost:5000/get/makes")
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        console.log(element)
        const option = document.createElement("div")
        option.innerHTML = element.makeName
        //send object values here
        option.onclick = (e) => populateModelFields(e.target.value)
        selector.appendChild(option)
      });
    })
}


//METHOD STILL NEEDS TO BE IMPLEMENTED
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

//METHOD STILL NEEDS TO BE IMPLEMENTED
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