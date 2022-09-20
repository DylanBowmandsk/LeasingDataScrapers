import ScraperForm from "./ScraperForm";
import DataOut from "./DataOut";
import { useState } from "react";
import ScrapeButtons from "./ScrapeButtons";
import ScraperFilters from "./ScraperFilters";
import { useEffect } from "react";

const HomePage = () => {

    const [make, setMake] = useState()
    const [model, setModel] = useState()
    const [variant, setVariant] = useState()
    const [derivative , setDerivative] = useState("All")
    const [leasingData, setLeasingData] = useState()
    const [selectData, setSelectData] = useState()
    const [locoData, setLocoData] = useState()
    const [term, setTerm] = useState(24)
    const [initialTerm, setInitialTerm] = useState(1)
    const [mileage, setMileage] = useState(5000)
    const [pvData, setPvData] = useState()
    const [localData, setLocalData] = useState(0)
    const [searchedData, setSearchedData] = useState()
    const [dataTrigger, setDataTrigger] = useState(false)

    useEffect(() => {
        loadLocalData(setLocalData, term, mileage, initialTerm)
        console.log(localData)
      },[])

    return (
        <div className="bg-slate-100 h-24">
            <div>
                <div className="inline-block ">
                    <ScraperForm setMake={setMake} setModel={setModel} setVariant={setVariant} make={make} model={model} derivative={derivative} setDerivative={setDerivative}/>
                    <ScraperFilters setTerm={setTerm} setInitialTerm={setInitialTerm} setMileage={setMileage}/>
                </div>
                <div className="inline-block align-top">
                <ScrapeButtons make={make} model={model} variant={variant} derivative={derivative} term={term} initialTerm={initialTerm} mileage={mileage} setLeasingData={setLeasingData} setSelectData={setSelectData} setLocoData={setLocoData} setPvData={setPvData} localData={localData} setSearchedData={setSearchedData}/>
                </div>
            </div>
            <DataOut make={make} searchedData={searchedData} leasingData={leasingData} selectData={selectData} locoData={locoData} pvData={pvData} initialTerm={initialTerm} term={term} mileage={mileage} dataTrigger={dataTrigger}/>
        </div>
        
    )
}

const loadLocalData = (setLocalData, term, mileage, initialTerm) => {
    fetch(`http://localhost:5000/get/all`)
  .then(response => response.json()).then(data => {
    let list = []
    data.forEach(element => {
        let car ={"name":element[0],
                "derivative": element[1],
                "pvPrice" : element[2],
                "locoPrice": element[3],
                "leasingPrice": element[4],
                }
        list.push(car)
    });
    setLocalData(list)
  })
}

export default HomePage