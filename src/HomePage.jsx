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
        <div>
            <Link to={"/admin"}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 m-5 rounded mr-2">Admin</button></Link>
            <ScraperForm setMake={setMake} setModel={setModel} setVariant={setVariant} make={make} model={model} derivative={derivative} setDerivative={setDerivative}/>
            <ScraperFilters setTerm={setTerm} setInitialTerm={setInitialTerm} setMileage={setMileage}/>
            <ScrapeButtons make={make} model={model} variant={variant} derivative={derivative} term={term} initialTerm={initialTerm} mileage={mileage} setLeasingData={setLeasingData} setSelectData={setSelectData} setLocoData={setLocoData} setPvData={setPvData}/>
            <DataOut leasingData={leasingData} selectData={selectData} locoData={locoData} pvData={pvData} initialTerm={initialTerm}/>
        </div>
        
    )
}

export default HomePage