import { useState } from "react"
import Navbar from "../components/Navbar"
import toast from "react-hot-toast"

function Profile(){

 const user = JSON.parse(localStorage.getItem("user"))

 const [name,setName] = useState(user.name)
 const [email,setEmail] = useState(user.email)
 const [password,setPassword] = useState(user.password)

 const updateProfile = () => {

  if(!name || !email || !password){
    toast.error("Please fill all fields")
    return
  }

  const updatedUser = { name, email, password }

  localStorage.setItem("user", JSON.stringify(updatedUser))

  toast.success("Profile updated successfully")
 }

 return(

 <div>

 <Navbar userName={name}/>

 <div className="p-6 max-w-md mx-auto">

 <h1 className="text-2xl mb-4">
   Profile
 </h1>

 <input
 className="border p-2 block mb-3 w-full rounded"
 value={name}
 onChange={(e)=>setName(e.target.value)}
 />

 <input
 className="border p-2 block mb-3 w-full rounded"
 value={email}
 onChange={(e)=>setEmail(e.target.value)}
 />

 <input
 className="border p-2 block mb-3 w-full rounded"
 value={password}
 onChange={(e)=>setPassword(e.target.value)}
 />

 <button
 onClick={updateProfile}
 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
 >

 Update

 </button>

 </div>

 </div>
 )
}

export default Profile