const SearchFilters = ({setSearchMileage, setSearchTerm, setSearchInitialTerm}) => {
    return(
        <div><span className="font-bold">Profile :</span>
            <select name="lease-term" onChange={(e) => setValues(e.target.value, setSearchMileage, setSearchTerm, setSearchInitialTerm)}>
                <option value="All">All</option>
                <option value="24-6-10000">24-6-10000</option>
                <option value="36-6-10000">36-6-10000</option>
                <option value="48-6-10000">48-6-10000</option>
            </select>
        </div>
    )
}

const setValues = (profile, setSearchMileage, setSearchTerm, setSearchInitialTerm) => {
    if(profile !== "All"){
        let tempString = profile.split("-")
        setSearchTerm(""+tempString[0])
        setSearchInitialTerm(""+tempString[1])
        setSearchMileage(""+tempString[2])
    }
    else{
        setSearchTerm("All")
        setSearchInitialTerm("All")
        setSearchMileage("All")
    }
}
export default SearchFilters