import { useState } from "react"

export default function useCart(){

 const [cart,setCart] = useState(
  JSON.parse(localStorage.getItem("cart")) || []
 )

 const saveCart = (updated)=>{
  localStorage.setItem("cart",JSON.stringify(updated))
  setCart(updated)
 }

 const addToCart = (product)=>{

  let updated = [...cart]

  const existing = updated.find(p=>p.id===product.id)

  if(existing){
   existing.qty += 1
  }else{
   updated.push({...product, qty:1})
  }

  saveCart(updated)
 }

 return { cart, addToCart, setCart }
}