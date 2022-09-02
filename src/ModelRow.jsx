const ModelRow = ({element}) => {
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
                    <p>LeaseLoco</p>
                    <p>{locoPrice}</p>
                </div>
                <div className="mr-20 mb-20">
                    <p>Leasing.com</p>
                    <p>{leasingPrice}</p>
                </div>
                <div className="mr-20 mb-20">
                    <p>Pv Price</p>
                    <p>{pvPrice}</p>
                </div>
            </div>
        </div>
    )
}

export default ModelRow