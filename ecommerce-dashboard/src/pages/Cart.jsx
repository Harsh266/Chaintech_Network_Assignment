import { useState } from "react"
import Navbar from "../components/Navbar"
import {
  getCart,
  increaseQty,
  decreaseQty,
  removeItem
} from "../utils/cart"

function Cart() {

  const [cart, setCart] = useState(getCart())

  const handleIncrease = (id) => {
    setCart(increaseQty(id))
  }

  const handleDecrease = (id) => {
    setCart(decreaseQty(id))
  }

  const handleRemove = (id) => {
    setCart(removeItem(id))
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  return (

    <div>

      <Navbar />

      <div className="p-6">

        <h1 className="text-2xl mb-6 font-bold">
          Shopping Cart
        </h1>

        {cart.length === 0 && (
          <p>Your cart is empty</p>
        )}

        {cart.map(item => {

          const subtotal = item.price * item.qty

          return (

            <div
              key={item.id}
              className="flex items-center justify-between border p-4 mb-4 rounded">

              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  className="h-16 w-16 object-contain"
                />

                <div>
                  <h3 className="text-sm font-semibold">
                    {item.title}
                  </h3>

                  <p>${item.price}</p>

                  <p className="text-sm text-gray-600">
                    Subtotal: ${subtotal.toFixed(2)}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-3">

                <button
                  onClick={() => handleDecrease(item.id)}
                  className="px-3 py-1 bg-gray-300">
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() => handleIncrease(item.id)}
                  className="px-3 py-1 bg-gray-300">
                  +
                </button>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded">

                  Remove

                </button>

              </div>

            </div>

          )

        })}

        {cart.length > 0 && (

          <div className="mt-6 text-xl font-bold">

            Cart Total: ${total.toFixed(2)}

          </div>

        )}

      </div>

    </div>

  )
}

export default Cart