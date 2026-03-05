import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute(){

 const session = JSON.parse(localStorage.getItem("session"))

 if(!session) return <Navigate to="/" />

 if(Date.now() > session.expiry){
  localStorage.removeItem("session")
  return <Navigate to="/" />
 }

 return <Outlet/>
}

export default ProtectedRoute