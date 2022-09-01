const ScraperFilters = ({setMileage, setTerm, setInitialTerm}) => {
    return(
        <div><span>Months</span>
            <select name="lease-term" onChange={(e) => setTerm(e.target.value)} id="">
                <option value="24">24 Months</option>
                <option value="36">36 Months</option>
                <option value="48">48 Months</option>
                <option value="60">60 Months</option>
            </select>
            <span>Initial Term</span>
            <select name="initial-term" onChange={(e) => setInitialTerm(e.target.value)} id="">
                <option value="1">1 Months</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="9">9 Months</option>
            </select>
            <span>Mileage</span>
            <select name="mileage" onChange={(e) => {setMileage(e.target.value)}} id="">
                <option value="5000">5000</option>
                <option value="6000">6000</option>
                <option value="8000">8000</option>
                <option value="10000">10000</option>
                <option value="12000">12000</option>
                <option value="15000">15000</option>
                <option value="20000">20000</option>
                <option value="25000">25000</option>
                <option value="30000">30000</option>
                <option value="35000">35000</option>
            </select>
        </div>
    )
}

export default ScraperFilters