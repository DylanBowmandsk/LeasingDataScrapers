const SearchButtons = ({make, model, variant, derivative, setSearchedData, localData, searchInitialTerm, searchTerm, searchMileage}) => {
    return(
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-36 rounded scrape-button" onClick={() => {Search(make, model, variant, derivative, setSearchedData, localData, searchInitialTerm, searchTerm, searchMileage)}}>Search</button>
        </div>
    )
}

const Search = (make, model, variant, derivative, setSearchedData, localData, searchInitialTerm, searchTerm, searchMileage) => {
    console.log(localData)
    let list 
    console.log(make,model,variant)
    if(make && model && variant && derivative){
        if(searchMileage === "All") list = localData.filter(element => element.make.includes(make) && element.model === model && element.variant === variant && element.derivative === derivative)
        else list = localData.filter(element => element.make.includes(make) && element.model === model && element.variant === variant && element.derivative === derivative && element.mileage === searchMileage && element.initialTerm === searchInitialTerm && element.term === searchTerm)
    }
    else if(make && model && variant ){
        console.log("here")
        if(searchMileage === "All") list = localData.filter(element => element.make.includes(make) && element.model === model && element.variant === variant)
        else list = localData.filter(element => element.make.includes(make) && element.model === model && element.variant === variant &&  element.mileage === searchMileage && element.initialTerm === searchInitialTerm && element.term === searchTerm)
    }
    else if(make && model ){
        if(searchMileage === "All") list = localData.filter(element => element.make.includes(make) && element.model === model)
        else list = localData.filter(element => element.make.includes(make) && element.model === model &&  element.mileage === searchMileage && element.initialTerm === searchInitialTerm && element.term === searchTerm)
    }
    else if(make){
        if(searchMileage === "All") list = localData.filter(element => element.make.includes(make))
        else list = localData.filter(element => element.make.includes(make) &&  element.mileage === searchMileage && element.initialTerm === searchInitialTerm && element.term === searchTerm)
    }
    setSearchedData(list)
  }

export default SearchButtons