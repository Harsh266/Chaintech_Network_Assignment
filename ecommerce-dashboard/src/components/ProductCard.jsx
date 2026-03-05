function ProductCard({product,addToCart}){

 return(

  <div className="border p-4">

   <img src={product.image} className="h-32 mx-auto"/>

   <h3 className="text-sm mt-2">{product.title}</h3>

   <p className="font-bold">${product.price}</p>

   <button
   onClick={()=>addToCart(product)}
   className="bg-blue-500 text-white px-3 py-1 mt-2">

   Add to Cart

   </button>

  </div>
 )
}

export default ProductCard