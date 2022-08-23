import ScraperForm from "./ScraperForm";
import DataOut from "./DataOut";
import { useState } from "react";
import { Link } from "react-router-dom";
import ScrapeButtons from "./ScrapeButtons";

const HomePage = () => {

    const [make, setMake] = useState()
    const [model, setModel] = useState()
    const [variant, setVariant] = useState()
    const [derivative , setDerivative] = useState("All")
    const [scrapedData, setScrapedData] = useState()

    return (
        <div>
            <Link to={"/admin"}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 m-5 rounded mr-2">Admin</button></Link>
            <ScraperForm setMake={setMake} setModel={setModel} setVariant={setVariant} make={make} model={model} derivative={derivative} setDerivative={setDerivative}/>
            <ScrapeButtons setScrapedData={setScrapedData} make={make} model={model} variant={variant} derivative={derivative}/>
            <DataOut  data={scrapedData}/>
        </div>
    )
}

export default HomePage