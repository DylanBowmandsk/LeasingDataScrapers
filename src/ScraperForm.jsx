import { useEffect } from "react"

const ScraperForm = () => {

    useEffect(() => {
      populateBrandFields()
      populateModelFields()
    })
  
    return (
      <div className="App">
        <select name="brand" id="brand">brand</select>
        <select name="model" id="model"><option>model</option></select>
  
      </div>
    );
}

const populateBrandFields = () => {
    let selector = document.getElementById("brand")
    let list = ["porsche","bmw"]
    list.forEach(element => {
      let option = document.createElement("option")
      option.innerHTML = element
      selector.appendChild(option)
    });
}
  
  const populateModelFields = () => {
    let selector = document.getElementById("model")
    let list =  ["1 Series", "2 Series"]
    list.forEach(element => {
      let option = document.createElement("option")
      option.innerHTML = element
      selector.appendChild(option)
    });
}

export default ScraperForm