import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import InfiniteScroll from "react-infinite-scroll-component"
import toast from "react-hot-toast"
import useCart from "../hooks/useCart"

const categoryMeta = {
  "electronics":      { label: "Electronics", icon: "💻", color: "bg-blue-50 text-blue-600" },
  "jewelery":         { label: "Jewelry",      icon: "💎", color: "bg-pink-50 text-pink-600" },
  "men's clothing":   { label: "Men's",        icon: "👔", color: "bg-slate-100 text-slate-600" },
  "women's clothing": { label: "Women's",      icon: "👗", color: "bg-rose-50 text-rose-600" },
}

const getCat = (cat) =>
  categoryMeta[cat] ?? { label: cat ?? "Product", icon: "🛍️", color: "bg-gray-50 text-gray-500" }

function StarIcon({ filled }) {
  return (
    <svg className={`w-3 h-3 ${filled ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function ProductCard({ product, onAdd }) {
  const cat = getCat(product.category)
  const rating = Math.round(product.rating?.rate ?? 5)

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      <div className="relative h-44 sm:h-52 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-32 sm:h-40 w-full object-contain p-4 sm:p-5 transition-transform duration-500 group-hover:scale-110"
        />
        <span className={`absolute top-2.5 left-2.5 text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full ${cat.color}`}>
          {cat.icon} {cat.label}
        </span>
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2 sm:gap-2.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug line-clamp-2 flex-1">
            {product.title}
          </h3>
          <span className="text-xs sm:text-sm font-bold text-gray-900 whitespace-nowrap shrink-0">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= rating} />)}
          </div>
          <span className="text-xs text-gray-400">
            {product.rating?.rate ?? "5.0"} ({product.rating?.count ?? 0})
          </span>
        </div>

        <button
          onClick={() => onAdd(product)}
          className="mt-auto flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-gray-700 active:scale-95 text-white text-xs sm:text-sm font-semibold py-2 sm:py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <CartIcon />
          Add to Cart
        </button>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-44 sm:h-52 bg-gray-100" />
      <div className="p-3 sm:p-4 flex flex-col gap-3">
        <div className="flex justify-between gap-2">
          <div className="h-4 bg-gray-100 rounded w-2/3" />
          <div className="h-4 bg-gray-100 rounded w-1/5" />
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => <div key={i} className="w-3 h-3 bg-gray-100 rounded" />)}
        </div>
        <div className="h-9 sm:h-10 bg-gray-100 rounded-xl mt-1" />
      </div>
    </div>
  )
}

const FILTERS = [
  { key: "All",              icon: "✨", label: "All" },
  { key: "electronics",      icon: "💻", label: "Electronics" },
  { key: "jewelery",         icon: "💎", label: "Jewelry" },
  { key: "men's clothing",   icon: "👔", label: "Men's" },
  { key: "women's clothing", icon: "👗", label: "Women's" },
]

export default function Products() {
  const { addToCart } = useCart()
  const [products, setProducts]         = useState([])
  const [visible, setVisible]           = useState(8)
  const [search, setSearch]             = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false) })
  }, [])

  const filtered = products
    .filter(p => activeFilter === "All" || p.category === activeFilter)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  const handleAdd = (product) => {
    addToCart(product)
    toast.success("Added to cart!", {
      style: { borderRadius: "12px", background: "#111", color: "#fff", fontSize: "13px" },
      iconTheme: { primary: "#4ade80", secondary: "#111" },
    })
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 pt-4 sm:pt-5 pb-0 flex justify-end">
        <div className="relative w-full sm:w-72">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all placeholder-gray-400"
            onChange={e => { setSearch(e.target.value); setVisible(8) }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-5 sm:py-7">

        <div className="flex gap-2 flex-wrap mb-5 sm:mb-7 overflow-x-auto pb-1 scrollbar-none">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => { setActiveFilter(f.key); setVisible(8) }}
              className={`shrink-0 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200
                ${activeFilter === f.key
                  ? "bg-gray-900 text-white border-gray-900 shadow-md scale-105"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
                }`}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 sm:py-28 gap-3 text-gray-400">
            <span className="text-5xl sm:text-6xl">🔍</span>
            <p className="text-base sm:text-lg font-semibold text-gray-600">No products found</p>
            <p className="text-xs sm:text-sm text-center px-4">Try a different search or category filter</p>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={visible}
            next={() => setVisible(v => v + 4)}
            hasMore={visible < filtered.length}
            loader={
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mt-3 sm:mt-5">
                {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            }
            endMessage={
              <p className="text-center text-xs sm:text-sm text-gray-400 py-6 sm:py-8">
                ✅ You've seen all {filtered.length} products
              </p>
            }
          >
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {filtered.slice(0, visible).map(product => (
                <ProductCard key={product.id} product={product} onAdd={handleAdd} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  )
}