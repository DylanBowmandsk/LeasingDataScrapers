import { useEffect, useState } from "react"
import ScrapeButtons from "./ScrapeButtons"


const ScraperForm = ({setMake, setModel, setVariant}) => {

    const [carList, setCarList] = useState()

    useEffect(() => {
      populateMakeFields(setCarList)
    },[])
  
    return (
      <div>
        <div className="mx-5">
          <span className="text-lg font-semibold" id="make-selector">Make : </span>
          <select className="mr-10 rounded" name="make" id="make" onChange={e => {populateModelFields(e.target.value , setModel, carList, setMake)}}>
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
const populateMakeFields = (setCarList) => {
    let selector = document.getElementById("make")
    fetch("http://localhost:5000/get/makes")
    .then(response => response.json())
    .then(data => {
      setCarList(data)
      data.forEach(element => {
        const option = document.createElement("option")
        option.innerHTML = element.make
        selector.appendChild(option)
      });
    })
}
  
//makes api call to populate the models of the previously selected brand input
  const populateModelFields = (make, setModel,carList,setMake) => {
    setMake(make)
    let selector = document.getElementById("model")
    selector.innerHTML = ""
    const models = carList.filter(element => element.make === make)
    console.log(models)
    models[0].cars.forEach((model, index) => {
      if (index === 0) setModel(model)
      let option = document.createElement("option")
      option.innerHTML = model
      selector.appendChild(option)
    });
}

export default ScraperForm
