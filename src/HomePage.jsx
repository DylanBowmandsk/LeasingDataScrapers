import ScraperForm from "./ScraperForm";
import DataOut from "./DataOut";
import { useState } from "react";
import ScrapeButtons from "./ScrapeButtons";

const HomePage = () => {

    const [make, setMake] = useState()
    const [model, setModel] = useState()
    const [variant, setVariant] = useState()
    const [scrapedData, setScrapedData] = useState()

    return (
        <div>
            <ScraperForm setMake={setMake} setModel={setModel} setVariant={setVariant}/>
            <ScrapeButtons setScrapedData={setScrapedData} make={make} model={model} variant={variant}/>
            <DataOut  data={scrapedData}/>
        </div>
    )
}

export default HomePage