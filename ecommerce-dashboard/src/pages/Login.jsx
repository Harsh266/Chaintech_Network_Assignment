import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"

function MailIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  )
}

function ShopIcon() {
  return (
    <svg className="w-5 h-5 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}

function InputField({ label, icon, type = "text", value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false)
  const [show, setShow] = useState(false)
  const isPassword = type === "password"

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-1">
        {label}
      </label>
      <div className={`flex items-center gap-3 bg-gray-50 border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-200
        ${focused
          ? "border-gray-900 bg-white shadow-sm ring-2 ring-gray-900/5"
          : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <span className="shrink-0">{icon}</span>
        <input
          type={isPassword && !show ? "password" : "text"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 min-w-0 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400 font-medium"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            className="text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors shrink-0"
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  )
}

export default function Login() {
  const navigate  = useNavigate()
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [loading,  setLoading]  = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("user"))

      if (user && email === user.email && password === user.password) {
        const session = { user, expiry: Date.now() + 5 * 60 * 1000 }
        localStorage.setItem("session", JSON.stringify(session))
        toast.success("Welcome back! 🎉", {
          style: { borderRadius: "12px", background: "#111", color: "#fff", fontSize: "13px" },
          iconTheme: { primary: "#4ade80", secondary: "#111" },
        })
        setTimeout(() => navigate("/dashboard"), 900)
      } else {
        toast.error("Invalid email or password", {
          style: { borderRadius: "12px", background: "#111", color: "#fff", fontSize: "13px" },
        })
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] font-sans flex items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
      <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-4 sm:gap-5">

        <div className="flex flex-col items-center gap-2 mb-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-2xl flex items-center justify-center shadow-md">
            <ShopIcon />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Chaintech Network</h1>
          <p className="text-xs sm:text-sm text-gray-400">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col gap-4 sm:gap-5">
          <form onSubmit={handleLogin} className="flex flex-col gap-3 sm:gap-4">

            <InputField
              label="Email Address"
              icon={<MailIcon />}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <InputField
              label="Password"
              type="password"
              icon={<LockIcon />}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-gray-700 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 text-white text-sm font-semibold py-2.5 sm:py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md mt-1"
            >
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <>Sign In <ArrowRightIcon /></>
              }
            </button>

          </form>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <p className="text-center text-xs sm:text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-gray-900 hover:underline">
              Create one
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}