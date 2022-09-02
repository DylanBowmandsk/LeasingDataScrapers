import { useState } from "react"
import { useEffect } from "react"
import ModelRow from "./ModelRow"

const DataOutTest = ({leasingData, selectData, locoData, pvData}) => {
    const [data , setData] = useState()


    useEffect(() => {
        if(leasingData && selectData && locoData  && pvData){
            collateData(leasingData, selectData, locoData, pvData, setData)
        }
      },[leasingData,selectData, pvData, locoData])


    return(
        <div>

            {data && data.map((element) => {   
                return (
                    <div> 
                         <ModelRow element={element}/>

                    </div>
                )
            })}
        </div>
    )
}

const collateData = (leasingData, selectData, locoData, pvData, setData) => {
    let data = []
    let derivatives = []

    pvData.forEach(element => {
        if(!derivatives.includes(element.derivative)) derivatives.push(element.derivative)
    })

    derivatives.forEach(element => {
        let derivative = element
        let name, term, mileage, leasingPrice, selectPrice, locoPrice, pvPrice, leasingTotalLease, locoUpfront, locoTotalLease

        selectData.forEach(selectCar => {
            if (selectCar.derivative === element){
                term = selectCar.term
                mileage = selectCar.mileage
                selectPrice = selectCar.price
            }
        })
        leasingData.forEach(leasingCar => {
            if (leasingCar.derivative === element){
                leasingPrice = leasingCar.price
                leasingTotalLease = leasingCar.totalLease

            }
        })
        locoData.forEach(locoCar => {
            if (locoCar.derivative === element){
                locoPrice = locoCar.price
                name = locoCar.name
                locoUpfront = locoCar.upfrontCost
                
                locoTotalLease = parseInt(locoCar.price.slice(1)) * (locoCar.term - 1)
                term = locoCar.term
                mileage = locoCar.mileage
            }
        })
        pvData.forEach(pvCar => {
            if (pvCar.derivative === element){
                if(pvCar.price == "No Data") pvPrice = pvCar.price
                else{
                    pvPrice = pvCar.price + "p/m"
                }
            }
            
        })
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
"locoTotalLease": locoTotalLease })
    })
    console.log(data)
    setData(data)
    
    
}

export default DataOutTest