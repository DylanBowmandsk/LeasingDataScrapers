import { useState, useEffect } from "react"
import AdminEditor from "./AdminEditor"


const AdminPage = () => {

    return(
        <div className="h-screen">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 m-5 rounded mr-2">Home</button>
            <AdminEditor/>
        </div>
    )
}


export default AdminPage