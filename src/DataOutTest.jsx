import ModelRow from "./ModelRow"

const DataOutTest = ({data}) => {
    return(
        <div>
            {data && data.map((element) => { 
                console.log(data)
                return (
                        <ModelRow price={element.price} totalLease={element.totalLease} term={element.term} name={element.name}/>
                )
            })}
            {!data && <span className="w-40 h-10 my-40 mx-auto block">No data to display</span>}
        </div>
    )
}

export default DataOutTest