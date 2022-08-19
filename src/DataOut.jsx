import { useEffect, useState } from "react"

const DataOut = ({data}) => {

    useEffect(() => {
        data && populateTable(data)
    })

    return (
        <div>
            <div className="table w-full">
                <div className="table-header-group">
                    <div className="table-row ">
                    <div className="table-cell text-left py-2">Name</div> 
                    <div className="table-cell text-left py-2">Derivative</div>
                        <div className="table-cell text-left py-2">Price</div>
                        <div className="table-cell text-left py-2">Total Cost</div>
                        <div className="table-cell text-left py-2">Mileage</div>
                        <div className="table-cell text-left py-2">Term</div>
                        <div className="table-cell text-left py-2">Upfront Cost</div>
                        <div className="table-cell text-left py-2">Initial Rental Months</div>
                    </div>
                </div>
                <div className="table-row-group" id="table-rows-group">
                </div>
            </div>
            {!data && <span className="w-40 h-10 my-40 mx-auto block">No data to display</span>}
        </div>
    )
}

const populateTable = (data) => {
    let tableGroup = document.getElementById("table-rows-group")
    tableGroup.innerHTML= ""
    data.forEach((element, index) => {
        let row = document.createElement("div")
        row.classList.add("table-row")
        index % 2 === 0 ? row.classList.add("bg-slate-50") : row.classList.add("bg-slate-300")

        //NAME
        let divName = document.createElement("div")
        divName.innerHTML = element.name
        row.appendChild(divName)
        
        //DERIVITIVE
        let divDerivative = document.createElement("div")
        divDerivative.innerHTML = element.derivative
        row.appendChild(divDerivative)

        //MONTHLY PRIVE
        let divPrice = document.createElement("div")
        divPrice.innerHTML = element.price
        row.appendChild(divPrice)

        //TOTAL
        let divTotal = document.createElement("div")
        divTotal.innerHTML = element.totalLease
        row.appendChild(divTotal)

        //MILEAGE
        let divMileage = document.createElement("div")
        divMileage.innerHTML = element.mileage
        row.appendChild(divMileage)

        //TERM
        let divTerm = document.createElement("div")
        divTerm.innerHTML = element.term
        row.appendChild(divTerm)


        //UPFRONT COST
        let divInitialRental = document.createElement("div")
        divInitialRental.innerHTML = element.upfrontCost
        row.appendChild(divInitialRental)

        //INITIAL TERM
        let divInitialRentalTerm = document.createElement("div")
        divInitialRentalTerm.innerHTML = element.initialTerm
        row.appendChild(divInitialRentalTerm)

        for(var i = 0; i< row.children.length; i++){
            row.children[i].classList.add("table-cell","py-2")
        }

        tableGroup.appendChild(row)
    });
}

export default DataOut

