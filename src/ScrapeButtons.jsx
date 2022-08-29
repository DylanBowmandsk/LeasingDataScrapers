const ScrapeButtons = ({make, model, variant, derivative, term, initialTerm, mileage,  setLeasingData, setLocoData, setSelectData}) => {
    
    return (
    <div className="mx-5 my-3" id="scraper-button-container">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2" onClick={() => {scrapeLeasingData(make, model, variant, derivative,term, initialTerm, mileage, setLeasingData)}}>Scrape Data Leasing.com</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {scrapelocoData(make, model, variant, derivative, setLocoData)}}>Scrape Data Leasing Loco.com</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {scrapeSelectData(make, model, variant, derivative, term, initialTerm, mileage, setSelectData)}}>Scrape Data Select Leasing.com</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {scrapeAll(make, model, variant, derivative,term, initialTerm, mileage, setLeasingData, setSelectData)}}>Scrape Data</button>
      </div>
    )
}

const scrapeAll = (make, model, variant, derivative,term, initialTerm, mileage, setLeasingData, setSelectData) => {
  scrapeLeasingData(make, model, variant, derivative,term, initialTerm, mileage, setLeasingData)
  scrapeSelectData(make, model, variant, derivative, term, initialTerm, mileage, setSelectData)

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
  const scrapelocoData = (make, model, variant, derivative, setLocoData) => {
    derivative = derivative.replace(/['"]+/g, '')
    fetch(`http://localhost:5000/leaseloco/scrape/${make.makeName}/${model.modelName}/${variant}/${derivative}`)
    .then(response => response.json()).then(data => {
      setLocoData(data)
    })
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