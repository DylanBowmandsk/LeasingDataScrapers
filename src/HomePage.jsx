import ScraperForm from "./ScraperForm";
import DataOut from "./DataOut";
import { useState } from "react";
import ScrapeButtons from "./ScrapeButtons";
import ScraperFilters from "./ScraperFilters";
import SearchFilters from "./SearchFilters";
import SearchButtons from "./SearchButtons";
import { useEffect } from "react";

const HomePage = () => {

    const [make, setMake] = useState()
    const [model, setModel] = useState()
    const [variant, setVariant] = useState()
    const [derivative , setDerivative] = useState()
    const [leasingData, setLeasingData] = useState()
    const [selectData, setSelectData] = useState()
    const [locoData, setLocoData] = useState()
    const [term, setTerm] = useState(24)
    const [initialTerm, setInitialTerm] = useState(1)
    const [mileage, setMileage] = useState(5000)
    const [searchTerm, setSearchTerm] = useState("All")
    const [searchInitialTerm, setSearchInitialTerm] = useState("All")
    const [searchMileage, setSearchMileage] = useState("All")
    const [pvData, setPvData] = useState()
    const [localData, setLocalData] = useState()
    const [searchedData, setSearchedData] = useState()
    const [localTrigger, setLocalTrigger] = useState()
    const [loading, setLoading] = useState(false)
    

    useEffect(() => {
        loadLocalData(setLocalData)
        console.log(localData)
      },[])

    return (
        <div className="bg-slate-100 h-24">
            <div>
                <div className="inline-block ">
                    <ScraperForm setMake={setMake} setModel={setModel} setVariant={setVariant} make={make} model={model} derivative={derivative} setDerivative={setDerivative}/>
                    <ScraperFilters setTerm={setTerm} setInitialTerm={setInitialTerm} setMileage={setMileage}/>
                    <SearchFilters setSearchTerm={setSearchTerm} setSearchInitialTerm={setSearchInitialTerm} setSearchMileage={setSearchMileage}/>
                    <SearchButtons make={make} model={model} variant={variant} derivative={derivative} localData={localData} setSearchedData={setSearchedData} searchMileage={searchMileage}
                searchTerm={searchTerm} searchInitialTerm={searchInitialTerm} setLocalTrigger={setLocalTrigger}/>
                </div>
                <div className="inline-block align-top">
                <ScrapeButtons make={make} model={model} variant={variant} derivative={derivative} term={term} initialTerm={initialTerm} mileage={mileage} setLeasingData={setLeasingData}
                setSelectData={setSelectData} setLocoData={setLocoData} setPvData={setPvData} localData={localData} setSearchedData={setSearchedData} searchMileage={searchMileage}
                searchTerm={searchTerm} searchInitialTerm={searchInitialTerm} setLocalTrigger={setLocalTrigger} setLoading={setLoading}/>
                </div>
            </div>
            <DataOut make={make} searchedData={searchedData} leasingData={leasingData} selectData={selectData} locoData={locoData} pvData={pvData} initialTerm={initialTerm} term={term} mileage={mileage} localTrigger={localTrigger}
            setLoading={setLoading} loading={loading}/>
        </div>
        
    )
}

const loadLocalData = (setLocalData) => {
    fetch(`http://localhost:5000/get/all`)
  .then(response => response.json()).then(data => {
    let list = []
    data.forEach(element => {
        let car ={"make":element[0],
                "model": element[1],
                "variant": element[2],
                "derivative": element[3],
                "term": element[4],
                "initialTerm": element[5],
                "mileage": element[6],
                "pvPrice" : element[7],
                "locoPrice": element[8],
                "leasingPrice": element[9],
                }
        list.push(car)
    });
    setLocalData(list)
  })
}

export default HomePage