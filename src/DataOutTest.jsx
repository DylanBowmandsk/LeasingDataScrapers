import { useState } from "react"
import { useEffect } from "react"
import ModelRow from "./ModelRow"

const DataOutTest = ({leasingData, selectData}) => {
    const [data , setData] = useState()


    useEffect(() => {
        if(leasingData && selectData){
            collateData(leasingData, selectData, setData)
        }
      },[leasingData,selectData])


    return(
        <div>

            {data && data.map((element) => {   
                return (
                    <div> 
                        <ModelRow price={element.price} leasingPrice={element.leasingPrice} selectPrice={element.selectPrice} totalLease={element.totalLease} term={element.term} name={element.name} derivative={element.derivative}/>
                    </div>
                )
            })}
        </div>
    )
}

const collateData = (leasingData, selectData, setData) => {
    let data = []
    let derivatives = []
    leasingData.forEach(element => {
        derivatives.push(element.derivative)
    });

    derivatives.forEach(element => {
        let derivative = element
        let name, term, mileage, leasingPrice, selectPrice 

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
        data.push({"name":name,
                "derivative": derivative,
                "term": term,
                "mileage":mileage,
                "leasingPrice": leasingPrice,
                "selectPrice": selectPrice})
    })
    setData(data)
    
    
}

export default DataOutTest