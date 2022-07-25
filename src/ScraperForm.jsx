
import { useEffect, useState } from "react"


const ScraperForm = () => {

    const [brand, setBrand] = useState()
    const [model, setModel] = useState()

    useEffect(() => {
      populateBrandFields()
    },[])
  
    return (
      <div className="App">
        <select name="brand" id="brand" defaultValue="--Brand--" onChange={e => {populateRangeFields(e.target.value, setBrand, setModel)}}>
          <option value="">Brand</option>
        </select>
        <select name="model" id="model" defaultValue="--Model--" onChange={e => {setModel(e.target.value)}}>
          <option value="">Series</option>
        </select>
        <button onClick={() => {scrapeData(brand, model)}}>Scrape</button>
      </div>
    );
}

//makes api call and fills out input fields of all brands we have in stock
const populateBrandFields = () => {
    let selector = document.getElementById("brand")
    fetch("http://localhost:5000/get/brands")
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        let option = document.createElement("option")
        option.innerHTML = element
        selector.appendChild(option)
      });
    })
}
  
//makes api call to populate the ranges of the previously selected brand input
  const populateRangeFields = (brand, setBrand,setModel) => {
    setBrand(brand)
    let selector = document.getElementById("model")
    selector.innerHTML = ""
    fetch("http://localhost:5000/get/"+brand+"/range")
    .then(response => response.json())
    .then(data => {
      data.forEach((element, index) => {
        if (index === 0) setModel(element)
        let option = document.createElement("option")
        option.innerHTML = element
        selector.appendChild(option)
      });
    });
}

const scrapeData = (brand, model) => {
  fetch("http://localhost:5000/scrape/"+brand+"/"+model)
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
}

export default ScraperForm
