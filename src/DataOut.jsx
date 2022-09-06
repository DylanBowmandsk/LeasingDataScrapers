import { useState } from "react"
import { useEffect } from "react"
import ModelRow from "./ModelRow"

const DataOutTest = ({leasingData, selectData, locoData, pvData, initialTerm}) => {
    const [data , setData] = useState()

    useEffect(() => {
        if(leasingData && selectData && locoData  && pvData){
            collateData(leasingData, selectData, locoData, pvData, setData)
        }
      },[leasingData,selectData, pvData, locoData])


    return(
        <div>

            {data && data.map((element, idx) => {   
                return (
                    <div> 
                        {idx == 0 && <div>
                            <h1 className="text-center text-4xl">{element.name}</h1>
                            <h2 className="text-center ">Term {element.term} Months</h2>
                            <h2 className="text-center">Mileage {element.mileage} Miles</h2> 
                            <h2 className="text-center mb-10">Initial Term {initialTerm} Months</h2>
                        </div>}
                        
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
        let name, term, mileage, leasingPrice, selectPrice, locoPrice, pvPrice, leasingTotalLease, locoUpfront, locoTotalLease, leasingUpfront, selectUpfront, selectTotalLease, pvTotalLease, pvUpfront

        selectData.forEach(selectCar => {
            if (selectCar.derivative === element){
                term = selectCar.term
                mileage = selectCar.mileage
                selectPrice = selectCar.price
                selectUpfront = selectCar.upfrontCost
                selectTotalLease = "£"+new Intl.NumberFormat().format(parseInt(selectPrice.slice(1)) * (parseInt(term) - 1) + parseInt(selectUpfront.slice(1)))
                
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
                name = locoCar.name
                locoUpfront = locoCar.upfrontCost
                locoTotalLease = "£"+new Intl.NumberFormat().format(parseInt(locoPrice.slice(1)) * (parseInt(term) - 1) + parseInt(locoUpfront.slice(1)))
                
                term = locoCar.term
                mileage = locoCar.mileage
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
                "pvTotalLease": pvTotalLease })
    })
    console.log(data)
    setData(data)
    
    
}

export default DataOutTest