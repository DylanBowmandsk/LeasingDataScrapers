const ScrapeButtons = ({make, model, setScrapedData}) => {
    return (
    <div className="mx-5 my-3" id="scraper-button-container">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2" onClick={() => {scrapeLeasingData(make, model, setScrapedData)}}>Scrape Data Leasing.com</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {scrapelocoData(make, model, setScrapedData)}}>Scrape Data Leasing Loco.com</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {scrapeSelectData(make, model, setScrapedData)}}>Scrape Data Select Leasing.com</button>
      </div>
    )
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

export default ScrapeButtons