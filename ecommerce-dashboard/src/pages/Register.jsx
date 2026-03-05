import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function Register(){

 const navigate = useNavigate()

 const [name,setName] = useState("")
 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const handleSubmit = (e)=>{
  e.preventDefault()

  if(!name || !email || !password){
    toast.error("Please fill all fields")
    return
  }

  const user = { name, email, password }

  localStorage.setItem("user", JSON.stringify(user))

  toast.success("Registration successful 🎉")

  setTimeout(()=>{
    navigate("/")
  },1000)
 }

 return(

 <div className="flex items-center justify-center h-screen bg-gray-100">

  <form onSubmit={handleSubmit} className="bg-white p-6 shadow w-80 rounded">

   <h2 className="text-xl mb-4">Register</h2>

   <input
   className="border p-2 w-full mb-3 rounded"
   placeholder="Name"
   onChange={(e)=>setName(e.target.value)}
   />

   <input
   className="border p-2 w-full mb-3 rounded"
   placeholder="Email"
   onChange={(e)=>setEmail(e.target.value)}
   />

   <input
   type="password"
   className="border p-2 w-full mb-3 rounded"
   placeholder="Password"
   onChange={(e)=>setPassword(e.target.value)}
   />

   <button className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded">
    Register
   </button>

  </form>

 </div>
 )
}

export default Register