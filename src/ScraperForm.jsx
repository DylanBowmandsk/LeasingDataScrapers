import { list } from "postcss"
import { useEffect, useState } from "react"

const ScraperForm = ({setMake, setModel, setVariant}) => {

    const [makeList, setMakeList] = useState()
    const [modelList, setModelList] = useState()
    const [variantList, setVariantList] = useState()
  
    useEffect(() => {
      populateMakeFields(setMakeList)
    },[])
  
    return (
      <div>
        <div className="mx-5">
          <span className="text-lg font-semibold" id="make-selector">Make : </span>
          <select className="mr-10 rounded" name="make" id="make" onChange={e => {populateModelFields(e.target.value, setMake, setModelList)}}>
            <option value="">Brand</option>
            {makeList && makeList.map((data, index) => {
              return (
              <option key={index} value={JSON.stringify(data)}>
                {data.makeName}
              </option>
              )
            })}
          </select>
          <span className="text-lg font-semibold" id="model-selector">Model: </span>
          <select name="model" id="model" onChange={e => {populateVariantsFields(e.target.value, setModel, setVariantList)}}>
            <option value="">Model</option>
            {modelList && modelList.map((data, index) => {
              return (
              <option key={index} value={JSON.stringify(data)}>
                {data.modelName}
              </option>
              )
            })}
          </select>
          <span className="text-lg font-semibold" id="variant-selector"> Variant: </span>
          <select name="Variant" id="variant" onChange={e => {setVariant(JSON.parse(e.target.value))}}>
          <option value="">Variant</option>
            {variantList && variantList.map((data, index) => {
              return (
              <option key={index} value={JSON.stringify(data)}>
                {data.modelTrim}
              </option>
              )
            })}
          </select>
        </div>
        <hr />

      </div>
    );
}

//makes api call and fills out input fields of all brands we have in stock
const populateMakeFields = (setMakeList) => {
    fetch("http://localhost:5000/get/makes")
    .then(response => response.json())
    .then(data => {
      let list = []
      data.forEach(element => {
        list.push(element)
      });
      setMakeList(list)
    })
}
  
//makes api call to populate the models of the previously selected brand input
  const populateModelFields = (makeString, setMake, setModelList) => {
    let make = JSON.parse(makeString)
    setMake(make)
    fetch("http://localhost:5000/get/models")
    .then(response => response.json())
    .then(data => {
      let list = []
      data.forEach((element) => {
        if(make.makeID === element.makeID){
          console.log(element)
          list.push(element)
        }
      });
      setModelList(list)
    })
}

//makes api call and fills out input fields of all model variants we have in stock
const populateVariantsFields = (modelString, setModel, setVariantList) => {
  let model = JSON.parse(modelString)
  setModel(model)
  fetch("http://localhost:5000/get/variants")
  .then(response => response.json())
  .then(data => {
    let list = []
    data.forEach(element => {
      if(model.modelID === element.ModelID)
        list.push(element)
        console.log(element)
    });
    setVariantList(list)
  })
}
export default ScraperForm
