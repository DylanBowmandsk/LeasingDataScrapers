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


//makes api call and fills out input fields of all brands we have in stock
const populateBrandFields = () => {
    let selector = document.getElementById("brand")
    selector.innerHTML = ""
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
  
//makes api call to populate the models of the previously selected brand input
  const populateModelFields = (brand, setBrand) => {
    setBrand(brand)
    let selector = document.getElementById("model")
    selector.innerHTML = ""
    fetch("http://localhost:5000/get/"+brand+"/models")
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        let option = document.createElement("option")
        option.innerHTML = element
        selector.appendChild(option)
      });
    });
}

export default ScraperForm