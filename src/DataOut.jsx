import { useEffect, useState } from "react"

const DataOut = ({data}) => {

    useEffect(() => {
        if(data) populateTable(data)
    })

    return (
        <div className="table w-full">
            <div className="table-header-group">
                <div className="table-row ">
                <div className="table-cell text-left py-2">Derivitive</div>
                    <div className="table-cell text-left py-2">Per Month</div>
                    <div className="table-cell text-left py-2">Total Cost</div>
                    <div className="table-cell text-left py-2">Mileage</div>
                    <div className="table-cell text-left py-2">Term</div>
                    <div className="table-cell text-left py-2">Additional Fees</div>
                    <div className="table-cell text-left py-2">Initial Rental</div>
                    <div className="table-cell text-left py-2">Initial Rental Months</div>
                </div>
            </div>
            <div className="table-row-group" id="table-rows-group">
            </div>
        </div>
    )
}

const populateTable = (data) => {
    let tableGroup = document.getElementById("table-rows-group")
    data.forEach((element, index) => {
        let row = document.createElement("div")
        row.classList.add("table-row")
        index % 2 === 0 ? row.classList.add("bg-slate-50") : row.classList.add("bg-slate-300")
        
        //DERIVITIVE
        let divDerivitive = document.createElement("div")
        divDerivitive.innerHTML = element.derivitive
        row.appendChild(divDerivitive)

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

        //ADDITIONAL FEES
        let divAdditionalFees = document.createElement("div")
        divAdditionalFees.innerHTML = element.additionalFees
        row.appendChild(divAdditionalFees)

        //INITIAL RENTAL
        let divInitialRental = document.createElement("div")
        divInitialRental.innerHTML = element.initialRental
        row.appendChild(divInitialRental)

        //INITIAL RENTAL TERM
        let divInitialRentalTerm = document.createElement("div")
        divInitialRentalTerm.innerHTML = element.initialRentalTerm
        row.appendChild(divInitialRentalTerm)

        for(var i = 0; i< row.children.length; i++){
            row.children[i].classList.add("table-cell","py-2")
        }

        tableGroup.appendChild(row)
        console.log(element)
    });
}

export default DataOut
