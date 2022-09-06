import { list } from "postcss"
import { useEffect, useState } from "react"

const ScraperForm = ({setMake, setModel, setVariant, make, model, setDerivative}) => {

    const [makeList, setMakeList] = useState()
    const [modelList, setModelList] = useState()
    const [variantList, setVariantList] = useState()
    const [derivativeList, setDerivativeList] = useState()
  
    useEffect(() => {
      populateMakeFields(setMakeList)
    },[])
  
    return (
      <div>
        <div className="mx-5">
          <span className="text-lg font-semibold" id="make-selector">Make : </span>
          <select className="mr-10 rounded" name="make" id="make" onChange={e => {populateModelFields(e.target.value, setMake, setModelList, setVariantList, setDerivativeList)}}>
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
          <select name="model" id="model" onChange={e => {populateVariantsFields(e.target.value, setModel, setVariantList, setDerivativeList)}}>
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
          <select name="Variant" id="variant" onChange={e => {populateDerivativeFields(e.target.value, model, setVariant,setDerivativeList)}}>
          <option value="">Variant</option>
            {variantList && variantList.map((data, index) => {
              return (
              <option key={index} value={JSON.stringify(data)}>
                {data}
              </option>
              )
            })}
          </select>
          <span className="text-lg font-semibold" id="derivative-selector"> Derivative: </span>
          <select name="Variant" id="derivative" onChange={e => {setDerivative(e.target.value)}}>
          <option value="All">All</option>
            {derivativeList && derivativeList.map((data, index) => {
              return (
              <option key={index} value={JSON.stringify(data)}>
                {data}
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
  const populateModelFields = (makeString, setMake, setModelList, setVariantList, setDerivativeList) => {
    let make = JSON.parse(makeString)
    setMake(make)
    fetch("http://localhost:5000/get/models")
    .then(response => response.json())
    .then(data => {
      let list = []
      data.forEach((element) => {
        if(make.makeID === element.makeID){
          list.push(element)
        }
      });
      setModelList(list)
      setVariantList([])
      setDerivativeList([])
    })
}

//makes api call and fills out input fields of all model variants we have in stock
const populateVariantsFields = (modelString, setModel, setVariantList, setDerivativeList) => {
  let model = JSON.parse(modelString)
  setModel(model)
  fetch(`http://localhost:5000/get/variants/${model.modelName}`)
  .then(response => response.json())
  .then(data => {
    try{
      let list = []
      data.forEach(element => {
        list.push(element)
    });
    if(data.length < 1) alert("No matches")
    setVariantList(list)
    setDerivativeList([])
  }catch{
    alert("no matches")
    setVariantList([])
    setDerivativeList([])
  }
  })
}

const populateDerivativeFields = (variant, model, setVariant, setDerivativeList) => {
  variant = variant.replace(/['"]+/g, '')
  setVariant(variant)
  fetch(`http://localhost:5000/get/derivatives/${model.modelName}/${variant}`)
  .then(response => response.json())
  .then(data => {
    try{
    let list = []
      data.forEach(element => {
        list.push(element)
    });
    setDerivativeList(list)}
    catch{
      alert("no matches")
      setDerivativeList([])
    }
  })
}
export default ScraperForm
