const ModelRow = ({price, totalLease, term, name}) => {
    return(
        <div>
            <div className="flex flex-row">
                <p className="inline-block">{name}</p>
                <div></div>
            </div>
        </div>
    )
}

export default ModelRow