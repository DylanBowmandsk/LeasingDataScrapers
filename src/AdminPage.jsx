import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import AdminEditor from "./AdminEditor"


const AdminPage = () => {

    return(
        <div className="h-screen">
            <Link to={"/"}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 m-5 rounded mr-2">Home</button></Link>
            <AdminEditor/>
        </div>
    )
}


export default AdminPage