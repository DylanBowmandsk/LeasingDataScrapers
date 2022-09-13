const ScrapeButtons = ({make, model, variant, derivative, term, initialTerm, mileage,  setLeasingData, setLocoData, setSelectData, setPvData}) => {
    
    return (
    <div className="mx-5 mt-4 relative" id="scraper-button-container">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2" onClick={() => {scrapeLeasingData(make, model, variant, derivative,term, initialTerm, mileage, setLeasingData)}}>Scrape Data Leasing.com</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {scrapeLocoData(make, model, variant, derivative, term, initialTerm, mileage, setLocoData)}}>Scrape Data Leasing Loco.com</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {scrapeSelectData(make, model, variant, derivative, term, initialTerm, mileage, setSelectData)}}>Scrape Data Select Leasing.com</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {scrapePvData(model, variant, derivative, term, initialTerm, mileage, setPvData)}}>Scrape Data PV</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-36 rounded scrape-button" onClick={() => {scrapeAll(make, model, variant, derivative,term, initialTerm, mileage, setLeasingData, setSelectData, setLocoData, setPvData)}}>Scrape Data</button>
      </div>
    )
}

const scrapeAll = (make, model, variant, derivative,term, initialTerm, mileage, setLeasingData, setSelectData, setLocoData, setPvData) => {
  setLeasingData([])
  setLocoData([])
  setSelectData([])
  setPvData([])
  scrapeLeasingData(make, model, variant, derivative,term, initialTerm, mileage, setLeasingData)
  scrapeSelectData(make, model, variant, derivative, term, initialTerm, mileage, setSelectData)
  scrapeLocoData(make, model, variant, derivative, term, initialTerm, mileage, setLocoData)
  scrapePvData(model, variant, derivative, term, initialTerm, mileage, setPvData)
}

const scrapePvData = (model, variant, derivative, term, initialTerm, mileage, setPvData) => {
  derivative = derivative.replace(/['"]+/g, '').replace("/", "+")
  if( derivative !== "All"){
  fetch(`http://localhost:5000/pv/scrape/${(derivative)}/${term}/${initialTerm}/${mileage}`)
  .then(response => response.json()).then(data => {
    console.log(data)
    setPvData(data)
  })}
  else {fetch(`http://localhost:5000/pv/scrape/${model.modelName}/${variant}/all/${term}/${initialTerm}/${mileage}`)
  .then(response => response.json()).then(data => {
    setPvData(data)
  })
}
}
const scrapeLeasingData = (make, model, variant, derivative,term, initialTerm, mileage, setLeasingData) => {
  derivative = derivative.replace("/", "").replace(/['"]+/g, '')
  if( derivative !== "All"){
    fetch(`http://localhost:5000/leasingcom/scrape/${make.makeName}/${model.modelName}/${variant}/${derivative}/${term}/${initialTerm}/${mileage}`)
    .then(response => response.json()).then(data => {
      setLeasingData(data)
    })
  }
  else {fetch(`http://localhost:5000/leasingcom/scrape/${make.makeName}/${model.modelName}/${variant}/all/${term}/${initialTerm}/${mileage}`)
    .then(response => response.json()).then(data => {
      setLeasingData(data)
    })
  }
}
  const scrapeLocoData = (make, model, variant, derivative,term, initialTerm, mileage, setLocoData) => {
    derivative = derivative.replace(/['"]+/g, '').replace("/", "+")
    if( derivative !== "All"){
      fetch(`http://localhost:5000/leaseloco/scrape/${make.makeName}/${model.modelName}/${variant}/${derivative}/${term}/${initialTerm}/${mileage}`)
      .then(response => response.json()).then(data => {
        setLocoData(data)
     })
  }
  else{
    fetch(`http://localhost:5000/leaseloco/scrape/${make.makeName}/${model.modelName}/${variant}/all/${term}/${initialTerm}/${mileage}`)
    .then(response => response.json()).then(data => {
      setLocoData(data)
   })
  }
}
  
  const scrapeSelectData = (make, model, variant, derivative, term, initialTerm, mileage, setSelectData) => {
    derivative = derivative.replace(/['"]+/g, '').replace("/", "")
    if( derivative !== "All"){
      fetch(`http://localhost:5000/selectleasing/scrape/${make.makeName}/${model.modelName}/${variant}/${derivative}/${term}/${initialTerm}/${mileage}`)
      .then(response => response.json()).then(data => {
        setSelectData(data)
    })
    }else{
      fetch(`http://localhost:5000/selectleasing/scrape/${make.makeName}/${model.modelName}/${variant}/all/${term}/${initialTerm}/${mileage}`)
      .then(response => response.json()).then(data => {
        setSelectData(data)
    })
  }
  }

export default ScrapeButtons