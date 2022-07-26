import ScraperForm from "./ScraperForm";
import DataOut from "./DataOut";
import { useState } from "react";

const App = () => {

  const [scrapedData, setScrapedData] = useState()

  return (
    <div className="main-container">
      <ScraperForm setScrapedData={setScrapedData}/>
      <DataOut  data={scrapedData}/>
    </div>
  );
}

export default App;
