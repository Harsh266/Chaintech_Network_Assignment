import { Link, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState, useRef } from "react"

function CartIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  )
}

function ShopIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
  )
}

const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: <GridIcon /> },
  { to: "/products",  label: "Products",  icon: <ShopIcon /> },
  { to: "/profile",   label: "Profile",   icon: <UserIcon /> },
]

export default function Navbar() {
  const navigate    = useNavigate()
  const location    = useLocation()
  const menuRef     = useRef(null)
  const [timeLeft,  setTimeLeft]  = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [urgent,    setUrgent]    = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  useEffect(() => {
    const tick = () => {
      const session = JSON.parse(localStorage.getItem("session"))
      if (!session) return
      const remaining = session.expiry - Date.now()
      if (remaining <= 0) {
        localStorage.removeItem("session")
        navigate("/")
        return
      }
      setTimeLeft(Math.floor(remaining / 1000))
      setUrgent(remaining < 60000)
      const cart = JSON.parse(localStorage.getItem("cart")) || []
      setCartCount(cart.reduce((s, i) => s + (i.qty ?? 1), 0))
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [navigate])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const logout = () => {
    localStorage.removeItem("session")
    navigate("/")
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav ref={menuRef} className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">

            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 shrink-0 min-w-0"
              aria-label="Chain Network home"
            >
              <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center text-white shrink-0">
                <ShopIcon />
              </div>
              <span className="text-base font-bold text-gray-900 tracking-tight truncate hidden xs:block sm:block">
                Chain Network
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ to, label, icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive(to)
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              {timeLeft > 0 && (
                <div
                  className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full select-none
                    ${urgent ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-500"}`}
                  title="Session time remaining"
                >
                  <ClockIcon />
                  <span>{minutes}:{seconds.toString().padStart(2, "0")}</span>
                </div>
              )}

              <Link
                to="/cart"
                aria-label={`Cart${cartCount > 0 ? `, ${cartCount} item${cartCount !== 1 ? "s" : ""}` : ""}`}
                className={`relative flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive("/cart")
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                <CartIcon />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all duration-200"
                aria-label="Logout"
              >
                <LogoutIcon />
                <span className="hidden sm:inline">Logout</span>
              </button>

              <button
                className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-xl hover:bg-gray-100 transition-colors gap-1"
                onClick={() => setMenuOpen(o => !o)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-200 origin-center
                  ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
                <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-200
                  ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
                <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-200 origin-center
                  ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
              </button>

            </div>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="border-t border-gray-100 px-3 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${isActive(to)
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))}

            <div className="border-t border-gray-100 mt-1 pt-2 flex items-center justify-between px-1">
              {timeLeft > 0 && (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full
                  ${urgent ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-500"}`}>
                  <ClockIcon />
                  <span>Session: {minutes}:{seconds.toString().padStart(2, "0")}</span>
                </div>
              )}
              <button
                onClick={() => { setMenuOpen(false); logout() }}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogoutIcon />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}