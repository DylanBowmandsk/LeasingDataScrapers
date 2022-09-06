const ModelRow = ({element}) => {
    return(
        <div>
            <div className="flex flex-row mx-20 mb-16 justify-center items-center">
                <p className="block mr-10 w-60 text-lg">{element.derivative}</p>
                <div className="mr-20">
                    <p className="text-xl">Select Leasing</p>
                    <p>{element.selectPrice}</p>
                    <p>{element.selectUpfront}</p>
                    <p>{element.selectTotalLease}</p>
                </div>
                <div className="mr-20 w-40">
                    <p className="text-xl">LeaseLoco</p>
                    <p>{element.locoPrice}</p>
                    <p>{element.locoUpfront}</p>
                    <p>{element.locoTotalLease}</p>
                </div>
                <div className="mr-20 w-40">
                    <p className="text-xl">Leasing.com</p>
                    <p>{element.leasingPrice}</p>
                    <p>{element.leasingUpfront}</p>
                    <p>{element.leasingTotalLease}</p>
                </div>
                <div className="mr-20 w-40">
                    <p className="text-xl">Pv Price</p>
                    <p>{element.pvPrice}</p>
                    <p>{element.pvUpfront}</p>
                    <p>{element.pvTotalLease}</p>
                </div>
            </div>
        </div>
    )
}

export default ModelRow