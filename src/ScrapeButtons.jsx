const ScrapeButtons = ({make, model, variant, derivative, term, initialTerm, mileage,  setScrapedData}) => {
    
    return (
    <div className="mx-5 my-3" id="scraper-button-container">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2" onClick={() => {scrapeLeasingData(make, model, variant, derivative,term, initialTerm, mileage, setScrapedData)}}>Scrape Data Leasing.com</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {scrapelocoData(make, model, variant, derivative, setScrapedData)}}>Scrape Data Leasing Loco.com</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {scrapeSelectData(make, model, variant, derivative, setScrapedData)}}>Scrape Data Select Leasing.com</button>
      </div>
    )
}

const scrapeLeasingData = (make, model, variant, derivative,term, initialTerm, mileage, setScrapedData) => {

  if( derivative !== "All"){
    derivative = derivative.replace("/", "").replace(/['"]+/g, '')
    fetch(`http://localhost:5000/leasingcom/scrape/${make.makeName}/${model.modelName}/${variant}/${derivative}/${term}/${initialTerm}/${mileage}`)
    .then(response => response.json()).then(data => {
      setScrapedData(data)
    })
  }
  else {fetch(`http://localhost:5000/leasingcom/scrape/${make.makeName}/${model.modelName}/${variant}/all/${term}/${initialTerm}/${mileage}`)
    .then(response => response.json()).then(data => {
      setScrapedData(data)
    })
  }
}
  const scrapelocoData = (make, model, variant, derivative, setScrapedData) => {
    fetch(`http://localhost:5000/leaseloco/scrape/${make.makeName}/${model.modelName}/${variant}/${derivative}`)
    .then(response => response.json()).then(data => {
      setScrapedData(data)
    })
  }
  
  const scrapeSelectData = (make, model, variant, derivative, setScrapedData) => {
    fetch(`http://localhost:5000/selectleasing/scrape/${make.makeName}/${model.modelName}/${variant}/${derivative}`)
    .then(response => response.json()).then(data => {
      setScrapedData(data)
    })
  }

export default ScrapeButtons