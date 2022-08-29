import { useState } from "react"
import { useEffect } from "react"
import ModelRow from "./ModelRow"

const DataOutTest = ({leasingData, selectData, locoData}) => {
    const [data , setData] = useState()


    useEffect(() => {
        if(leasingData && selectData && locoData){
            collateData(leasingData, selectData, locoData, setData)
        }
      },[leasingData,selectData, locoData])


    return(
        <div>

            {data && data.map((element) => {   
                return (
                    <div> 
                        <ModelRow price={element.price} leasingPrice={element.leasingPrice} selectPrice={element.selectPrice} locoPrice={element.locoPrice} totalLease={element.totalLease} term={element.term} name={element.name} derivative={element.derivative}/>
                    </div>
                )
            })}
        </div>
    )
}

const collateData = (leasingData, selectData, locoData, setData) => {
    let data = []
    let derivatives = []
    leasingData.forEach(element => {
        derivatives.push(element.derivative)
    });

    derivatives.forEach(element => {
        let derivative = element
        let name, term, mileage, leasingPrice, selectPrice, locoPrice

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
            console.log(locoCar)
            if (locoCar.derivative === element){
                console.log(locoCar)
                locoPrice = locoCar.price
            }
        })
        data.push({"name":name,
                "derivative": derivative,
                "term": term,
                "mileage":mileage,
                "leasingPrice": leasingPrice,
                "selectPrice": selectPrice,
                "locoPrice": locoPrice})
    })
    console.log(data)
    setData(data)
    
    
}

export default DataOutTest