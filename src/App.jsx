import { useEffect } from "react";

const App = () => {

  useEffect(() => {
    console.log("useffect")
    populateFields()
  })
  return (
    <div className="App">
      <select name="brand" id="brand">
        
      </select>
    </div>
  );
}

const populateFields = () => {
  let selector = document.getElementById("brand")
  let list = ["porsche","bmw"]
  list.forEach(element => {
    let option = document.createElement("option")
    option.innerHTML = element
    console.log("run")
    selector.appendChild(option)
  });
}

export default App;
