import { useEffect,useState } from "react"
import Navbar from "../components/Navbar"
import InfiniteScroll from "react-infinite-scroll-component"
import toast from "react-hot-toast"
import useCart from "../hooks/useCart"

function Products(){

 const { addToCart } = useCart()

 const [products,setProducts] = useState([])
 const [visible,setVisible] = useState(8)
 const [search,setSearch] = useState("")
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

 fetch("https://fakestoreapi.com/products")
 .then(res=>res.json())
 .then(data=>{
  setProducts(data)
  setLoading(false)
 })

 },[])

 const loadMore = ()=>{
  setVisible(prev=>prev+4)
 }

 const filtered = products.filter(p =>
  p.title.toLowerCase().includes(search.toLowerCase())
 )

 if(loading){
  return <div className="p-10">Loading...</div>
 }

 return(

 <div>

 <Navbar/>

 <div className="p-6">

 <input
 placeholder="Search product..."
 className="border p-2 mb-6 w-full max-w-md"
 onChange={(e)=>setSearch(e.target.value)}
 />

 <InfiniteScroll
 dataLength={visible}
 next={loadMore}
 hasMore={visible < filtered.length}
 loader={<h4>Loading...</h4>}
 >

 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

 {filtered.slice(0,visible).map(product=>(
 
 <div key={product.id} className="border p-4 rounded shadow">

 <img
 src={product.image}
 className="h-40 mx-auto object-contain"
 />

 <h3 className="text-sm mt-3">{product.title}</h3>

 <p className="font-bold mt-2">
 ${product.price}
 </p>

 <button
 onClick={()=>{
  addToCart(product)
  toast.success("Added to cart")
 }}
 className="bg-blue-500 text-white w-full mt-3 py-2 rounded"
 >
 Add to Cart
 </button>

 </div>

 ))}

 </div>

 </InfiniteScroll>

 </div>

 </div>
 )
}

export default Products