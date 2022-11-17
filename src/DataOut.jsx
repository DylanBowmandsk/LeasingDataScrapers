import { useState } from "react"
import { useEffect } from "react"
import ModelRow from "./ModelRow"

const DataOut = ({make, leasingData, selectData, locoData, pvData, initialTerm, term, mileage, searchedData, localTrigger, setLoading, loading}) => {
    const [scrapeData , setScrapedData] = useState()
    const [localData , setLocalData] = useState()

    useEffect(() => {
        if(leasingData    && locoData  && pvData ){
            setScrapedData()
            collateData(leasingData, locoData, pvData, setScrapedData, term, initialTerm, mileage, setLoading)
        }
        if(searchedData){
            setLocalData(searchedData)
        }

        console.log(localTrigger)
      },[leasingData, pvData, locoData, searchedData])


    return(
        <div>
            {scrapeData && localTrigger == false && loading === false && scrapeData.map((element, idx) => {   
                return (
                    <div> 
                        {idx === 0 && <div className="text-center mt-10">
                            <h1 className="text-4xl roboto-400">{element.make}</h1>
                            <h2>Term {element.term} Months</h2>
                            <h2>Mileage {element.mileage} Miles</h2> 
                            <h2 className="mb-10">Initial Term {initialTerm} Months</h2>
                        </div>
                        }
                        <ModelRow element={element}/>
                    </div>
                )
            })}
            {loading === true &&
            <div>
                <h1 className="text-center">LOADING</h1>
            </div>
            }
            {localData && localTrigger && localData.map((element, idx) => {   
                return (
                    <div> 
                        {idx === 0 && <div className="text-center mt-10">
                            <h1 className="text-4xl roboto-400">{make}</h1>
                            <h2>Term {element.term} Months</h2>
                            <h2>Mileage {element.mileage} Miles</h2> 
                            <h2 className="mb-10">Initial Term {element.initialTerm} Months</h2>
                        </div>
                        }
                        <ModelRow element={element}/>
                    </div>
                )
            })}
        </div>
    )
}

const collateData = (leasingData, locoData, pvData, setData, term, initialTerm, mileage, setLoading) => {
    let data = []
    let derivatives = []

    pvData.forEach(element => {
        if(!derivatives.includes(element.derivative)) derivatives.push(element.derivative)
    })

    derivatives.forEach(element => {
        let derivative = element
        let name, leasingPrice, selectPrice, locoPrice, pvPrice, leasingTotalLease, locoUpfront, locoTotalLease, leasingUpfront, selectUpfront, selectTotalLease, pvTotalLease, pvUpfront

        leasingData.forEach(leasingCar => {
            if (leasingCar.derivative === element){
                leasingPrice = leasingCar.price
                leasingTotalLease = leasingCar.totalLease
                leasingUpfront = leasingCar.upfrontCost

            }
        })
        locoData.forEach(locoCar => {
            if (locoCar.derivative === element){
                locoPrice = locoCar.price+"p/m"
                if(locoCar.price == "No Data") locoPrice = locoCar.price
                name = locoCar.name
                locoUpfront = locoCar.upfrontCost
                if(locoCar.price !== "No Data")
                locoTotalLease = "£"+new Intl.NumberFormat().format(parseInt(locoPrice.slice(1)) * (parseInt(term) - 1) + parseInt(locoUpfront.slice(1)))
                else locoTotalLease ="No Data"
                
            }
        })
        pvData.forEach(pvCar => {
            if (pvCar.derivative === element){
                if(pvCar.price === "No Data") pvPrice = pvCar.price
                else{
                    pvPrice = "£"+pvCar.price + "p/m"
                    pvUpfront = "£"+parseInt(pvCar.upfrontCost) * parseInt(pvPrice.slice(1))
                    pvTotalLease = "£"+new Intl.NumberFormat().format((pvCar.price * parseInt(term)))
                
                    
                }
            }
            
        })
        

        let highest  = pvPrice > locoPrice && pvPrice && leasingPrice > selectPrice ? "pv" : locoPrice > pvPrice && locoPrice && leasingPrice > selectPrice ? "loco" : leasingPrice > pvPrice && leasingPrice > locoPrice && leasingPrice > selectPrice ? "leasingcom" : "select"
        let lowest  = pvPrice < locoPrice && pvPrice && leasingPrice < selectPrice ? "pv" : locoPrice < pvPrice && locoPrice && leasingPrice < selectPrice ? "loco" : leasingPrice < pvPrice && leasingPrice < locoPrice && leasingPrice < selectPrice ? "leasingcom" : "select"

        data.push({"name":name,
                "derivative": derivative,
                "term": term,
                "mileage":mileage,
                "leasingPrice": leasingPrice,
                "selectPrice": selectPrice,
                "locoPrice": locoPrice,
                "pvPrice" : pvPrice,
                "leasingTotalLease": leasingTotalLease,
                "locoUpfront": locoUpfront, 
                "locoTotalLease": locoTotalLease,
                "leasingUpfront": leasingUpfront,
                "selectUpfront": selectUpfront,
                "selectTotalLease": selectTotalLease,
                "pvUpfront": pvUpfront,
                "pvTotalLease": pvTotalLease,
                "highest": highest,
               "lowest": lowest})
    })
    console.log(data)
    setLoading(false)
    setData(data)
    
    
}

export default DataOut