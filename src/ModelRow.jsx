const ModelRow = ({name, term, mileage, leasingPrice, selectPrice, locoPrice, derivative}) => {
    return(
        <div>
            <p className="inline-block">{name}</p>
            <p className="block mb-10">{derivative}</p>
            <div className="flex flex-row">
                <div className="mr-20">
                    <p>Select Leasing</p>
                    <p>{selectPrice}</p>
                </div>
                <div className="mr-20">
                    <p>Loco Leasing</p>
                    <p>{locoPrice}</p>
                </div>
                <div className="mr-20 mb-20">
                    <p>Leasing.com</p>
                    <p>{leasingPrice}</p>
                </div>

            </div>
        </div>
    )
}

export default ModelRow