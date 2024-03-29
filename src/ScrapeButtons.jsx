import { isCompositeComponent } from "react-dom/test-utils"

const ScrapeButtons = ({make, model, variant, derivative, term, initialTerm, mileage, setSearchedData, setLeasingData, setLocoData, setSelectData, setPvData, setLocalTrigger,setLoading}) => {
    
    return (
    <div className="mx-5 mt-4 relative" id="scraper-button-container">
        {/*<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2" onClick={() => {scrapeLeasingData(make, model, variant, derivative,term, initialTerm, mileage, setLeasingData)}}>Scrape Data Leasing.com</button>
        //<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {scrapeLocoData(make, model, variant, derivative, term, initialTerm, mileage, setLocoData)}}>Scrape Data Leasing Loco.com</button>
        //<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {scrapeSelectData(make, model, variant, derivative, term, initialTerm, mileage, setSelectData)}}>Scrape Data Select Leasing.com</button>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {scrapePvData(model, variant, derivative, term, initialTerm, mileage, setPvData)}}>Scrape Data PV</button>*/}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-36 mr-2 rounded scrape-button" onClick={() => {scrapeAll(make, model, variant, derivative,term, initialTerm, mileage, setLeasingData, setSelectData, setLocoData, setPvData, setLocalTrigger, setLoading)}}>Scrape Data</button>  
      </div>
    )
}

const scrapeAll = (make, model, variant, derivative,term, initialTerm, mileage, setLeasingData, setSelectData, setLocoData, setPvData, setLocalTrigger, setLoading) => {
  if(make && model && variant){
    setLeasingData()
    setLocoData()
    setSelectData()
    setPvData()
    setLocalTrigger(false)
    setLoading(true)
    scrapeLeasingData(make, model, variant, derivative,term, initialTerm, mileage, setLeasingData)
    scrapeLocoData(make, model, variant, derivative, term, initialTerm, mileage, setLocoData)
    scrapePvData(model, variant, derivative, term, initialTerm, mileage, setPvData)
  }
  else{
    alert("fill fields")
  }
}

const scrapePvData = (model, variant, derivative, term, initialTerm, mileage, setPvData) => {
  derivative = derivative.replace(/['"]+/g, '').replace("/", "+")
  if(derivative){
  fetch(`http://20.254.177.250:8000/pv/scrape/${(derivative)}/${term}/${initialTerm}/${mileage}`)
  .then(response => response.json()).then(data => {
    console.log(data)
    setPvData(data)
  })}
  else {fetch(`http://20.254.177.250:8000/pv/scrape/${model}/${variant}/all/${term}/${initialTerm}/${mileage}`)
  .then(response => response.json()).then(data => {
    setPvData(data)
  })
}
}
const scrapeLeasingData = (make, model, variant, derivative,term, initialTerm, mileage, setLeasingData) => {
  derivative = derivative.replace("/", "").replace(/['"]+/g, '')
  if(derivative){
    fetch(`http://20.254.177.250:8000/leasingcom/scrape/${make}/${model}/${variant}/${derivative}/${term}/${initialTerm}/${mileage}`)
    .then(response => response.json()).then(data => {
      setLeasingData(data)
    })
  }
  else {fetch(`http://20.254.177.250:8000/leasingcom/scrape/${make}/${model}/${variant}/all/${term}/${initialTerm}/${mileage}`)
    .then(response => response.json()).then(data => {
      setLeasingData(data)
    })
  }
}
  const scrapeLocoData = (make, model, variant, derivative,term, initialTerm, mileage, setLocoData) => {
    derivative = derivative.replace(/['"]+/g, '').replace("/", "+")
    if( derivative){
      fetch(`http://20.254.177.250:8000/leaseloco/scrape/${make}/${model}/${variant}/${derivative}/${term}/${initialTerm}/${mileage}`)
      .then(response => response.json()).then(data => {
        setLocoData(data)
     })
  }
  else{
    fetch(`http://20.254.177.250:8000/leaseloco/scrape/${make}/${model}/${variant}/all/${term}/${initialTerm}/${mileage}`)
    .then(response => response.json()).then(data => {
      setLocoData(data)
   })
  }
}
  
  const scrapeSelectData = (make, model, variant, derivative, term, initialTerm, mileage, setSelectData) => {
    derivative = derivative.replace(/['"]+/g, '').replace("/", "")
    if( derivative){
      fetch(`http://localhost:8000/selectleasing/scrape/${make}/${model}/${variant}/${derivative}/${term}/${initialTerm}/${mileage}`)
      .then(response => response.json()).then(data => {
        setSelectData(data)
    })
    }else{
      fetch(`http://localhost:8000/selectleasing/scrape/${make}/${model}/${variant}/all/${term}/${initialTerm}/${mileage}`)
      .then(response => response.json()).then(data => {
        setSelectData(data)
    })
  }
  }

export default ScrapeButtons