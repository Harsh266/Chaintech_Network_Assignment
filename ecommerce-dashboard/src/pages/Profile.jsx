import { useState } from "react"
import Navbar from "../components/Navbar"
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

function SaveIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function PersonIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
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
        ${focused ? "border-gray-900 bg-white shadow-sm ring-2 ring-gray-900/5" : "border-gray-200 hover:border-gray-300"}`}>
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

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"))

  const [name,     setName]     = useState(user?.name ?? "")
  const [email,    setEmail]    = useState(user?.email ?? "")
  const [password, setPassword] = useState(user?.password ?? "")
  const [saved,    setSaved]    = useState(false)

  const updateProfile = () => {
    if (!name || !email || !password) {
      toast.error("Please fill all fields", {
        style: { borderRadius: "12px", background: "#111", color: "#fff", fontSize: "13px" },
      })
      return
    }
    localStorage.setItem("user", JSON.stringify({ name, email, password }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
    toast.success("Profile updated!", {
      style: { borderRadius: "12px", background: "#111", color: "#fff", fontSize: "13px" },
      iconTheme: { primary: "#4ade80", secondary: "#111" },
    })
  }

  const initials = name
    ? name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "?"

  return (
    <div className="min-h-screen bg-[#f4f5f7] font-sans">
      <Navbar userName={name} />

      <div className="max-w-xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-7 flex flex-col gap-4 sm:gap-5">

        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 flex items-center gap-3 sm:gap-5">
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shrink-0 shadow-md">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate">{name || "Your Name"}</h2>
            <p className="text-xs sm:text-sm text-gray-400 truncate">{email || "your@email.com"}</p>
            <span className="inline-block mt-1.5 sm:mt-2 text-xs font-semibold bg-green-50 text-green-600 px-2.5 py-0.5 rounded-full">
              ✅ Active Account
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col gap-4 sm:gap-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-gray-900">Edit Information</h3>
            <span className="text-xs text-gray-400 shrink-0">* All fields required</span>
          </div>

          <InputField
            label="Full Name"
            icon={<PersonIcon />}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your full name"
          />

          <InputField
            label="Email Address"
            icon={<MailIcon />}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
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
            onClick={updateProfile}
            className={`flex items-center justify-center gap-2 w-full font-semibold py-2.5 sm:py-3 rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95
              ${saved
                ? "bg-green-600 hover:bg-green-600 text-white"
                : "bg-gray-900 hover:bg-gray-700 text-white"
              }`}
          >
            {saved ? <><SaveIcon /> Saved!</> : "Update Profile"}
          </button>
        </div>

      </div>
    </div>
  )
}