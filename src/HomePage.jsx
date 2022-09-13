import ScraperForm from "./ScraperForm";
import DataOut from "./DataOut";
import { useState } from "react";
import { Link } from "react-router-dom";
import ScrapeButtons from "./ScrapeButtons";
import ScraperFilters from "./ScraperFilters";

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

    return (
        <div className="bg-slate-100 h-24">
            <div>
                <div className="inline-block ">
                    <ScraperForm setMake={setMake} setModel={setModel} setVariant={setVariant} make={make} model={model} derivative={derivative} setDerivative={setDerivative}/>
                    <ScraperFilters setTerm={setTerm} setInitialTerm={setInitialTerm} setMileage={setMileage}/>
                </div>
                <div className="inline-block align-top">
                <ScrapeButtons make={make} model={model} variant={variant} derivative={derivative} term={term} initialTerm={initialTerm} mileage={mileage} setLeasingData={setLeasingData} setSelectData={setSelectData} setLocoData={setLocoData} setPvData={setPvData}/>
                </div>
            </div>
            <DataOut leasingData={leasingData} selectData={selectData} locoData={locoData} pvData={pvData} initialTerm={initialTerm} term={term} mileage={mileage}/>
        </div>
        
    )
}

export default HomePage