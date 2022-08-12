import { useEffect, useState } from "react"

const ScraperForm = ({setMake, setModel, setVariant}) => {
  
    useEffect(() => {
      populateMakeFields()
    },[])
  
    return (
      <div>
        <div className="mx-5">
          <span className="text-lg font-semibold" id="make-selector">Make : </span>
          <select className="mr-10 rounded" name="make" id="make" onChange={e => {populateModelFields(e.target.value , setMake)}}>
            <option value="">Brand</option>
          </select>
          <span className="text-lg font-semibold" id="model-selector"> Model: </span>
          <select name="model" id="model" onChange={e => {populateVariantsFields(e.target.value, setModel)}}>
            <option value="">Model</option>
          </select>
          <span className="text-lg font-semibold" id="variant-selector"> Variant: </span>
          <select name="Variant" id="variant" onChange={e => {setVariant(e.target.value)}}>
            <option value="">Variant</option>
          </select>
        </div>
        <hr />

      </div>
    );
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
export default ScraperForm
