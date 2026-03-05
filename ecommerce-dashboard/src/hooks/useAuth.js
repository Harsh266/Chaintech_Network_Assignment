import { useNavigate } from "react-router-dom"

export default function useAuth(){

 const navigate = useNavigate()

 const getSession = () => {
   return JSON.parse(localStorage.getItem("session"))
 }

 const logout = () => {
   localStorage.removeItem("session")
   navigate("/")
 }

 return { getSession, logout }
}