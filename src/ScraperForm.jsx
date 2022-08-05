import { useEffect, useState } from "react"


const ScraperForm = ({setScrapedData}) => {

    const [make, setMake] = useState()
    const [model, setModel] = useState()
    const [carList, setCarList] = useState()

    useEffect(() => {
      populateMakeFields(setCarList)
    },[])
  
    return (
      <div className="App">
        <select name="make" id="make" onChange={e => {populateModelFields(e.target.value , setModel, carList, setMake)}}>
          <option value="">Brand</option>
        </select>
        <select name="model" id="model" onChange={e => {setModel(e.target.value)}}>
          <option value="">Series</option>
        </select>
        <button className="mx-5" onClick={() => {scrapeLeasingData(make, model, setScrapedData)}}>Scrape Leasing</button>
        <button className="mx-5" onClick={() => {scrapelocoData(make, model, setScrapedData)}}>Scrape loco</button>
        <button className="mx-5" onClick={() => {scrapeSelectData(make, model, setScrapedData)}}>Scrape Select</button>
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
    const models = carList.filter(element => element.make == make)
    console.log(models)
    models[0].cars.forEach((model, index) => {
      if (index === 0) setModel(model)
      let option = document.createElement("option")
      option.innerHTML = model
      selector.appendChild(option)
    });
}

const scrapeLeasingData = (make, model, setScrapedData) => {
  fetch(`http://localhost:5000/leasingcom/scrape/${make}/${model}`)
  .then(response => response.json()).then(data => {
    setScrapedData(data)
  })
}

const scrapelocoData = (make, model, setScrapedData) => {
  fetch(`http://localhost:5000/leaseloco/scrape/${make}/${model}`)
  .then(response => response.json()).then(data => {
    console.log(data)
    setScrapedData(data)
  })
}

const scrapeSelectData = (make, model, setScrapedData) => {
  fetch(`http://localhost:5000/selectleasing/scrape/${make}/${model}`)
  .then(response => response.json()).then(data => {
    console.log(data)
    setScrapedData(data)
  })
}

export default ScraperForm
