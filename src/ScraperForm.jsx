import { useEffect, useState } from "react"


const ScraperForm = ({setScrapedData}) => {

    const [make, setMake] = useState()
    const [model, setModel] = useState()

    useEffect(() => {
      populateMakeFields()
    },[])
  
    return (
      <div className="App">
        <select name="make" id="make" onChange={e => {populateModelFields(e.target.value, setMake, setModel)}}>
          <option value="">Brand</option>
        </select>
        <select name="model" id="model" onChange={e => {setModel(e.target.value)}}>
          <option value="">Series</option>
        </select>
        <button onClick={() => {scrapeData(make, model, setScrapedData)}}>Scrape</button>
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
        let option = document.createElement("option")
        option.innerHTML = element
        selector.appendChild(option)
      });
    })
}
  
//makes api call to populate the models of the previously selected brand input
  const populateModelFields = (make, setMake, setModel) => {
    setMake(make)
    let selector = document.getElementById("model")
    selector.innerHTML = ""
    fetch("http://localhost:5000/get/"+make+"/model")
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

const scrapeData = (make, model, setScrapedData) => {
  fetch("http://localhost:5000/scrape/"+make+"/"+model)
  .then(response => response.json())
  .then(data => {
    setScrapedData(data)
  })
}

export default ScraperForm
