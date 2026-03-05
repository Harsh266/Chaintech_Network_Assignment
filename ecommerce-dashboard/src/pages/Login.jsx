import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"

function Login(){

 const navigate = useNavigate()

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const handleLogin=(e)=>{
  e.preventDefault()

  const user = JSON.parse(localStorage.getItem("user"))

  if(user && email===user.email && password===user.password){

   const session={
    user:user,
    expiry:Date.now()+5*60*1000
   }

   localStorage.setItem("session",JSON.stringify(session))

   toast.success("Login successful 🎉")

   setTimeout(()=>{
     navigate("/dashboard")
   },1000)

  }else{
   toast.error("Invalid email or password")
  }
 }

 return(

 <div className="flex items-center justify-center h-screen bg-gray-100">

  <form onSubmit={handleLogin} className="bg-white p-6 shadow w-80 rounded">

   <h2 className="text-xl mb-4">Login</h2>

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

   <button className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded">
    Login
   </button>

   <p className="mt-3 text-sm">
    No account? <Link to="/register" className="text-blue-500">Register</Link>
   </p>

  </form>

 </div>
 )
}

export default Login