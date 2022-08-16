import { useState } from "react"
import { useEffect } from "react"

const AdminEditor = () => {

    const [make, setMake] = useState()
    const [model, setModel] = useState()
    const [variant, setVariant] = useState()
    const [makeList, setMakeList] = useState()
    const [modelList, setModelList] = useState()
    const [variantList, setVariantList] = useState()
    const [variantInput, setVariantInput] = useState()

    useEffect(() => {
        populateMakeFields(setMakeList)
    },[])

    return (
        <div id="editor-container" className="w-1/3 mx-auto mt-80">
            <div id="make-container">
              <select className="w-full mr-10 rounded" name="make" id="make" onChange={e => {populateModelFields(e.target.value , setMake, setModelList)}}>
                <option value="">Brand</option>
                {makeList && makeList.map((data, index) => {
              return (
              <option key={index} value={JSON.stringify(data)}>
                {data.makeName}
              </option>
              )
            })}
              </select>
            </div>
            <div id="model-container">
            <select className="w-full my-5" name="model" id="model" onChange={e => {populateVariantsFields(e.target.value, setModel, setVariantList)}}>
              <option value="">Model</option>
              {modelList && modelList.map((data, index) => {
              return (
              <option key={index} value={JSON.stringify(data)}>
                {data.modelName}
              </option>
              )
            })}
            </select>
            </div>
            <div id="variant-container">
            <select className="w-full" name="Variant" id="variant" onChange={e => {setVariant(e.target.value)}}>
              <option value="">Variant</option>
              {variantList && variantList.map((data, index) => {
              return (
              <option key={index} value={JSON.stringify(data)}>
                {data.modelTrim}
              </option>
              )
            })}
            </select>
            <div>
              <input type="text" onChange={e => setVariantInput(e.target.value)} />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 m-5 rounded mr-2" onClick={() => {addCar(make.makeID, model.modelID ,variantInput)}}>Add</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 m-5 rounded mr-2">Edit</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 m-5 rounded mr-2" onClick={() => {deleteCar(make.makeID, model.modelID ,variant)}}>Delete</button></div>
            </div>
        </div>
    )
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
    });
    setVariantList(list)
  })
}

  const addCar = (makeID, modelID, variant) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Accept' : 'application/json, text/plain, */*',
       'Content-Type': 'application/json' },
      body: JSON.stringify({ "makeID" : makeID, "modelID": modelID, "variant" : variant })
  }
  fetch(`http://localhost:5000/admin/add/${makeID}/${modelID}/${variant}`, requestOptions)
        .then(response => response.json())
        .then(data =>  console.log(data));
  
  }

  const deleteCar = (makeID, modelID, variant) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Accept' : 'application/json, text/plain, */*',
       'Content-Type': 'application/json' },
      body: JSON.stringify({ "makeID" : makeID, "modelID": modelID, "variant" : variant })
  }
  fetch(`http://localhost:5000/admin/delete/${makeID}/${modelID}/${variant}`, requestOptions)
        .then(response => response.json())
        .then(data =>  console.log(data));
  
  }

export default AdminEditor