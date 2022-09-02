const ModelRow = ({element}) => {
    return(
        <div>
            <p className="inline-block">{element.name}</p>
            <p className="block mb-10">{element.derivative}</p>
            <div className="flex flex-row">
                <div className="mr-20">
                    <p>Select Leasing</p>
                    <p>{element.selectPrice}</p>
                </div>
                <div className="mr-20">
                    <p>LeaseLoco</p>
                    <p>{element.locoPrice}</p>
                    <p>{element.locoUpfront}</p>
                    <p>{element.locoTotalLease}</p>
                </div>
                <div className="mr-20 mb-20">
                    <p>Leasing.com</p>
                    <p>{element.leasingPrice}</p>
                    <p>{element.leasingTotalLease}</p>
                </div>
                <div className="mr-20 mb-20">
                    <p>Pv Price</p>
                    <p>{element.pvPrice}</p>
                </div>
            </div>
        </div>
    )
}

export default ModelRow