const ModelRow = ({price, totalLease, term, name, derivative}) => {
    return(
        <div>
            <div className="flex flex-row">
                <p className="inline-block">{name}</p>
                <p>{derivative}</p>
                <p>{price}</p>
                <p>{term}</p>
            </div>
        </div>
    )
}

export default ModelRow