import { useState } from "react"
import { useEffect } from "react"
import ModelRow from "./ModelRow"

const DataOutTest = ({leasingData, selectData}) => {
    const [data , setData] = useState()


    useEffect(() => {
        if(leasingData && selectData){
            collateData(leasingData, selectData)
        }
      },[leasingData,selectData])


    return(
        <div>
            {data && data.map((element) => {   
                return (
                    <div>
                        <ModelRow price={element.price} totalLease={element.totalLease} term={element.term} name={element.name} derivative={element.derivative}/>
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
        let derivative = element.derivative
        let name 
        let term
        let mileage
        let leasingPrice
        let selectPrice

        selectData.forEach(selectCar => {
            if (selectCar.derivative === element.derivative){
                name = selectCar.name
                term = selectCar.term
                mileage = selectCar.mileage
                selectPrice = selectCar.price
            }
        })
        leasingData.forEach(leasingCar => {
            if (leasingCar.derivative === element.derivative){
                leasingPrice = leasingCar.price
            }
        })
    })
 
    
}

export default DataOutTest