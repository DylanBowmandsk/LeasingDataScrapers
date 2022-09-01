import { useState } from "react"
import { useEffect } from "react"
import ModelRow from "./ModelRow"

const DataOutTest = ({leasingData, selectData, locoData, pvData}) => {
    const [data , setData] = useState()


    useEffect(() => {
        if(leasingData && selectData && locoData && pvData){
            collateData(leasingData, selectData, locoData, pvData, setData)
        }
      },[leasingData,selectData, locoData, pvData])


    return(
        <div>

            {data && data.map((element) => {   
                return (
                    <div> 
                        <ModelRow price={element.price} leasingPrice={element.leasingPrice} selectPrice={element.selectPrice} pvPrice={element.pvPrice} locoPrice={element.locoPrice} totalLease={element.totalLease} term={element.term} name={element.name} derivative={element.derivative}/>
                    </div>
                )
            })}
        </div>
    )
}

const collateData = (leasingData, selectData, locoData, pvData, setData) => {
    let data = []
    let derivatives = []
    leasingData.forEach(element => {
        derivatives.push(element.derivative)
    });

    derivatives.forEach(element => {
        let derivative = element
        let name, term, mileage, leasingPrice, selectPrice, locoPrice, pvPrice

        selectData.forEach(selectCar => {
            if (selectCar.derivative === element){
                name = selectCar.name
                term = selectCar.term
                mileage = selectCar.mileage
                selectPrice = selectCar.price
            }
        })
        leasingData.forEach(leasingCar => {
            if (leasingCar.derivative === element){
                leasingPrice = leasingCar.price
            }
        })
        locoData.forEach(locoCar => {
            if (locoCar.derivative === element){
                locoPrice = locoCar.price
            }
        })
        pvData.forEach(pvCar => {
            if (pvCar.derivative === element){
                pvPrice = pvCar.price
            }
        })
        data.push({"name":name,
                "derivative": derivative,
                "term": term,
                "mileage":mileage,
                "leasingPrice": leasingPrice,
                "selectPrice": selectPrice,
                "locoPrice": locoPrice,
            "pvPrice" : pvPrice})
    })
    console.log(data)
    setData(data)
    
    
}

export default DataOutTest