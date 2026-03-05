import { useState } from "react"
import Navbar from "../components/Navbar"
import { getCart, increaseQty, decreaseQty, removeItem } from "../utils/cart"

function TrashIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  )
}

function CartBagIcon() {
  return (
    <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  )
}

const categoryMeta = {
  "electronics":      { label: "Electronics", icon: "💻", color: "bg-blue-50 text-blue-600" },
  "jewelery":         { label: "Jewelry",      icon: "💎", color: "bg-pink-50 text-pink-600" },
  "men's clothing":   { label: "Men's",        icon: "👔", color: "bg-slate-100 text-slate-600" },
  "women's clothing": { label: "Women's",      icon: "👗", color: "bg-rose-50 text-rose-600" },
}
const getCat = (cat) => categoryMeta[cat] ?? { label: "Product", icon: "🛍️", color: "bg-gray-50 text-gray-500" }

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const cat = getCat(item.category)
  const subtotal = item.price * item.qty

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 flex gap-3 sm:gap-4 items-center group">
      <div className="w-16 h-16 sm:w-24 sm:h-24 shrink-0 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain p-1.5 sm:p-2 group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="flex-1 min-w-0">
        <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1 ${cat.color}`}>
          {cat.icon} {cat.label}
        </span>
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">${item.price.toFixed(2)} each</p>

        <div className="flex items-center justify-between mt-2 sm:hidden">
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => onDecrease(item.id)}
              className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-700 font-bold hover:bg-gray-50 active:scale-90 transition-all text-sm"
            >
              −
            </button>
            <span className="w-5 text-center text-xs font-semibold text-gray-800">{item.qty}</span>
            <button
              onClick={() => onIncrease(item.id)}
              className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-700 font-bold hover:bg-gray-50 active:scale-90 transition-all text-sm"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-gray-900">${subtotal.toFixed(2)}</p>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-400 hover:text-red-600 transition-colors p-1"
              aria-label="Remove item"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
        <p className="text-base font-bold text-gray-900">${subtotal.toFixed(2)}</p>
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => onDecrease(item.id)}
            className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-700 font-bold hover:bg-gray-50 active:scale-90 transition-all text-sm"
          >
            −
          </button>
          <span className="w-6 text-center text-sm font-semibold text-gray-800">{item.qty}</span>
          <button
            onClick={() => onIncrease(item.id)}
            className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-700 font-bold hover:bg-gray-50 active:scale-90 transition-all text-sm"
          >
            +
          </button>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors font-medium"
        >
          <TrashIcon /> Remove
        </button>
      </div>
    </div>
  )
}

export default function Cart() {
  const [cart, setCart]     = useState(getCart())
  const [ordered, setOrdered] = useState(false)

  const handleIncrease = (id) => setCart(increaseQty(id))
  const handleDecrease = (id) => setCart(decreaseQty(id))
  const handleRemove   = (id) => setCart(removeItem(id))

  const total      = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const itemCount  = cart.reduce((sum, item) => sum + item.qty, 0)
  const shipping   = total > 100 ? 0 : 9.99
  const grandTotal = total + shipping

  return (
    <div className="min-h-screen bg-[#f4f5f7] font-sans">
      <Navbar />

      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight truncate">🛒 Shopping Cart</h1>
            <p className="text-xs text-gray-400">
              {itemCount === 0 ? "Your cart is empty" : `${itemCount} item${itemCount > 1 ? "s" : ""} in your cart`}
            </p>
          </div>
          <a href="/products" className="shrink-0 flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
            <ArrowLeftIcon />
            <span className="hidden xs:inline sm:inline">Continue Shopping</span>
            <span className="xs:hidden sm:hidden">Shop</span>
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-7">

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 sm:py-28 gap-3 text-center">
            <CartBagIcon />
            <p className="text-base sm:text-lg font-semibold text-gray-600 mt-2">Your cart is empty</p>
            <p className="text-xs sm:text-sm text-gray-400">Add some products to get started</p>
            <a href="/products" className="mt-3 sm:mt-4 flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-gray-700 transition-all">
              <ArrowLeftIcon /> Browse Products
            </a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">

            <div className="flex-1 flex flex-col gap-3 w-full">
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 lg:sticky lg:top-24">
                <h2 className="text-sm sm:text-base font-bold text-gray-900">Order Summary</h2>

                <div className="flex flex-col gap-2 sm:gap-2.5 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm">Subtotal ({itemCount} items)</span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm">Shipping</span>
                    <span className={`text-xs sm:text-sm font-semibold ${shipping === 0 ? "text-green-600" : "text-gray-800"}`}>
                      {shipping === 0 ? "Free 🎉" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg">
                      💡 Add ${(100 - total).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-bold text-gray-900">Total</span>
                  <span className="text-lg sm:text-xl font-bold text-gray-900">${grandTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => setOrdered(true)}
                  className="w-full bg-gray-900 hover:bg-gray-700 active:scale-95 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm"
                >
                  Checkout →
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}