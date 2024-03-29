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
        <div className="mr-5 mt-3.5">
          <span className="text-lg font-semibold" id="make-selector">Make : </span>
          <select className="mr-10 rounded" name="make" id="make" onChange={e => {populateModelFields(e.target.value, setMake, setModel, setVariant, setDerivative, setModelList, setVariantList, setDerivativeList)}}>
            <option value="">Brand</option>
            {makeList && makeList.map((data, index) => {
              return (
              <option key={index} value={JSON.stringify(data)}>
                {data}
              </option>
              )
            })}
          </select>
          <span className="text-lg font-semibold" id="model-selector">Model: </span>
          <select name="model" id="model" onChange={e => {populateVariantsFields(make, e.target.value, setModel, setVariant, setDerivative, setVariantList, setDerivativeList)}}>
            <option value="">Model</option>
            {modelList && modelList.map((data, index) => {
              return (
              <option key={index} value={JSON.stringify(data)}>
                {data}
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
          <select name="Variant" id="derivative" onChange={e => {setDerivative(e.target.value.replace(/['"]+/g, ''))}}>
          <option value="">Derivative</option>
            {derivativeList && derivativeList.map((data, index) => {
              return (
              <option key={index} value={JSON.stringify(data)}>
                {data}
              </option>
              )
            })}
          </select>
        </div>


      </div>
    );
}

//makes api call and fills out input fields of all brands we have in stock
const populateMakeFields = (setMakeList) => {
    fetch("http://20.254.177.250:8000/get/makes")
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
  const populateModelFields = (makeString, setMake, setModel, setVariant, setDerivative, setModelList, setVariantList, setDerivativeList) => {
    let make = JSON.parse(makeString)
    setMake(make)
    fetch(`http://20.254.177.250:8000/get/models/${make.replace(/['"]+/g, '')}`)
    .then(response => response.json())
    .then(data => {
      let list = []
      data.forEach((element) => {
        list.push(element)
        
      });
      setModelList(list)
      setVariantList()
      setDerivativeList()
      setModel()
      setVariant()
      setDerivative("")
      document.getElementById("model").value = ""
      document.getElementById("derivative").value = ""
    })
}

//makes api call and fills out input fields of all model variants we have in stock
const populateVariantsFields = (make, model, setModel, setVariant, setDerivative, setVariantList, setDerivativeList) => {
  model = model.replace(/['"]+/g, '')
  setModel(model)
  console.log(model)
  fetch(`http://20.254.177.250:8000/get/variants/${make.replace(/['"]+/g, '')}/${model}`)
  .then(response => response.json())
  .then(data => {
    try{
      let list = []
      data.forEach(element => {
        list.push(element)
        console.log(element)
    });
      setVariantList(list)
      setDerivativeList()
      setVariant()
      setDerivative("")
  }catch{
      alert("no matches")
      setVariantList()
      setDerivativeList()
  }
  })
}

const populateDerivativeFields = (variant, model, setVariant, setDerivativeList) => {
  variant = variant.replace(/['"]+/g, '')
  setVariant(variant)
  fetch(`http://20.254.177.250:8000/get/derivatives/${model.replace(/['"]+/g, '')}/${variant}`)
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
