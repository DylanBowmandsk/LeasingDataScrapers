const ModelRow = ({name, term, mileage, leasingPrice, selectPrice, locoPrice, derivative}) => {
    return(
        <div>
            <div className="flex flex-row">
                <p className="inline-block">{name}</p>
                <p>{derivative}</p>
                <p>{selectPrice}</p>
                <p>{leasingPrice}</p>
                <p>{locoPrice}</p>
                <p>{term}</p>
            </div>
        </div>
    )
}

export default ModelRow