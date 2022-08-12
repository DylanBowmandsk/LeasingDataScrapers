import { useEffect, useState } from "react"

const ScraperForm = ({setMake, setModel, setVariant}) => {
  
    useEffect(() => {
      populateMakeFields()
    },[])
  
    return (
      <div>
        <div className="mx-5">
          <span className="text-lg font-semibold" id="make-selector">Make : </span>
          <select className="mr-10 rounded" name="make" id="make" onChange={e => {populateModelFields(e.target.value , setMake ,setModel)}}>
            <option value="">Brand</option>
          </select>
          <span className="text-lg font-semibold" id="model-selector"> Model: </span>
          <select name="model" id="model" onChange={e => {setModel(e.target.value)}}>
            <option value="">Series</option>
          </select>
          <span className="text-lg font-semibold" id="model-selector"> Variant: </span>
          <select name="model" id="model" onChange={e => {setVariant(e.target.value)}}>
            <option value="">Series</option>
          </select>
        </div>
        <hr />

      </div>
    );
}

//makes api call and fills out input fields of all brands we have in stock
const populateMakeFields = (setModel) => {
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
  const populateModelFields = (makeString, setMake ,setModel) => {
    let make = JSON.parse(makeString)
    setMake(make)
    document.getElementById("model").innerHTML = ""
    let selector = document.getElementById("model")
    fetch("http://localhost:5000/get/models")
    .then(response => response.json())
    .then(data => {
      data.forEach((element , idx) => {
        if(make.makeID === element.makeID){
          if(idx === 0 ) setModel(element.model)
        const option = document.createElement("option")
        option.innerHTML = element.model
        selector.appendChild(option)
        }
      });
    })
}

export default ScraperForm
