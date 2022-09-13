import { setSelectionRange } from "@testing-library/user-event/dist/utils"
import { useState } from "react"
import { useEffect } from "react"
import ModelRow from "./ModelRow"

const DataOutTest = ({leasingData, selectData, locoData, pvData, initialTerm, term, mileage}) => {
    const [data , setData] = useState()

    useEffect(() => {
        if(leasingData  && selectData  && locoData   && pvData ){
            console.log(leasingData)
            console.log(pvData)
            console.log(locoData)
            console.log(selectData)
            collateData(leasingData, selectData, locoData, pvData, setData, term, initialTerm, mileage)
        }
      },[leasingData,selectData, pvData, locoData])


    return(
        <div>

            {data && data.map((element, idx) => {   
                return (
                    <div> 
                        {idx == 0 && <div className="text-center mt-10">
                            <h1 className="text-4xl roboto-400">{element.name}</h1>
                            <h2>Term {element.term} Months</h2>
                            <h2>Mileage {element.mileage} Miles</h2> 
                            <h2 className="mb-10">Initial Term {initialTerm} Months</h2>
                        </div>}
                        
                         <ModelRow element={element}/>

                    </div>
                )
            })}
        </div>
    )
}

const collateData = (leasingData, selectData, locoData, pvData, setData, term, initialTerm, mileage) => {
    let data = []
    let derivatives = []

    pvData.forEach(element => {
        if(!derivatives.includes(element.derivative)) derivatives.push(element.derivative)
    })

    derivatives.forEach(element => {
        let derivative = element
        let name, leasingPrice, selectPrice, locoPrice, pvPrice, leasingTotalLease, locoUpfront, locoTotalLease, leasingUpfront, selectUpfront, selectTotalLease, pvTotalLease, pvUpfront

        selectData.forEach(selectCar => {
            if (selectCar.derivative === element){
                selectPrice = selectCar.price
                selectUpfront = selectCar.upfrontCost
                if(selectCar.price != "No Data"){
                    selectTotalLease = "£"+new Intl.NumberFormat().format(parseInt(selectPrice.slice(1)) * (parseInt(term) - 1) + parseInt(selectUpfront.slice(1)))
                }
                else{
                    selectTotalLease = selectCar.price
                }
                
            }
        })
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
                if(locoCar.price != "No Data")
                locoTotalLease = "£"+new Intl.NumberFormat().format(parseInt(locoPrice.slice(1)) * (parseInt(term) - 1) + parseInt(locoUpfront.slice(1)))
                else locoTotalLease ="No Data"
                
            }
        })
        pvData.forEach(pvCar => {
            if (pvCar.derivative === element){
                if(pvCar.price == "No Data") pvPrice = pvCar.price
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
    setData(data)
    
    
}

export default DataOutTest