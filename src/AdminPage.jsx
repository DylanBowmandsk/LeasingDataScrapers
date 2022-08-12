import { useState, useEffect } from "react"
import AdminEditor from "./AdminEditor"


const AdminPage = () => {

    const [make, setMake] = useState()
    const [model, setModel] = useState()
    const [variant, setVariant] = useState()

    return(
        <div>
            <AdminEditor setMake={setMake} setModel={setModel} setVariant={setVariant}/>
        </div>
    )
}


export default AdminPage