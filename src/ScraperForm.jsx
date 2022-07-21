import { useEffect, useState } from "react"


const ScraperForm = () => {

    const [brand, setBrand] = useState()

    useEffect(() => {
      populateBrandFields()
    },[])
  
    return (
      <div className="App">
        <select name="brand" id="brand" onChange={(e) => {populateModelFields(e.target.value, setBrand)}}>brand</select>
        <select name="model" id="model"><option>model</option></select>
        <button>Scrape</button>
      </div>
    );
}

const populateBrandFields = () => {
    let selector = document.getElementById("brand")
    selector.innerHTML = ""
    let list = ["porsche","bmw"]
    list.forEach(element => {
      let option = document.createElement("option")
      option.innerHTML = element
      selector.appendChild(option)
    });
}
  
  const populateModelFields = (model, setBrand) => {
    var bmwlist =  ["1 Series", "2 Series"]
    var porschelist = ["Cayenne", "Panamera"] 

    setBrand(model)
    let selector = document.getElementById("model")
    selector.innerHTML = ""
    let list = model === "bmw" ? bmwlist : porschelist
    list.forEach(element => {
      let option = document.createElement("option")
      option.innerHTML = element
      selector.appendChild(option)
    });
}

export default ScraperForm