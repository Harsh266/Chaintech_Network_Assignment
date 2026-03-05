import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function Navbar() {

 const navigate = useNavigate()
 const [timeLeft,setTimeLeft] = useState(0)
 const [cartCount,setCartCount] = useState(0)

 useEffect(()=>{

  const timer = setInterval(()=>{

   const session = JSON.parse(localStorage.getItem("session"))

   if(!session) return

   const remaining = session.expiry - Date.now()

   if(remaining <= 0){
    localStorage.removeItem("session")
    navigate("/")
   }

   setTimeLeft(Math.floor(remaining/1000))

   const cart = JSON.parse(localStorage.getItem("cart")) || []
   setCartCount(cart.length)

  },1000)

  return ()=>clearInterval(timer)

 },[navigate])

 const minutes = Math.floor(timeLeft/60)
 const seconds = timeLeft % 60

 const logout = ()=>{
  localStorage.removeItem("session")
  navigate("/")
 }

 return(

 <nav className="bg-gray-800 dark:bg-gray-900 text-white px-6 py-4 flex justify-between">

 <h1 className="font-bold">E-Commerce</h1>

 <div className="flex gap-6">

 <Link to="/dashboard">Dashboard</Link>
 <Link to="/products">Products</Link>

 <Link to="/cart">
 Cart ({cartCount})
 </Link>

 <Link to="/profile">Profile</Link>

 </div>

 <div className="flex gap-4 items-center">

 <span className="text-yellow-400">
 {minutes}:{seconds.toString().padStart(2,"0")}
 </span>

 <button
 onClick={logout}
 className="bg-red-500 px-3 py-1 rounded"
 >
 Logout
 </button>

 </div>

 </nav>
 )
}

export default Navbar