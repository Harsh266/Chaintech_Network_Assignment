import Navbar from "../components/Navbar"

function GridIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.499z" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}

export default function Dashboard() {
  const session = JSON.parse(localStorage.getItem("session"))
  const user = session?.user

  const initials = user?.name
    ? user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "U"

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="min-h-screen bg-[#f4f5f7] font-sans">
      <Navbar userName={user?.name} />

      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 flex flex-col gap-4 sm:gap-5">

        <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 flex items-center justify-between gap-3 sm:gap-6 shadow-md overflow-hidden relative">
          <div className="absolute -right-8 -top-8 w-32 sm:w-40 h-32 sm:h-40 bg-white/5 rounded-full pointer-events-none" />
          <div className="absolute -right-2 -bottom-10 w-24 sm:w-28 h-24 sm:h-28 bg-white/5 rounded-full pointer-events-none" />

          <div className="relative z-10 min-w-0 flex-1">
            <p className="text-gray-400 text-xs sm:text-sm font-medium truncate">{greeting} 👋</p>
            <h2 className="text-lg sm:text-2xl font-bold text-white mt-0.5 truncate">{user?.name ?? "Welcome back"}</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-1.5 line-clamp-2">Here's what's happening with your account today.</p>
            <a
              href="/products"
              className="inline-flex items-center gap-2 mt-3 sm:mt-4 bg-white text-gray-900 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-sm"
            >
              Shop Now <ArrowRightIcon />
            </a>
          </div>

          <div className="shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-500 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg relative z-10">
            {initials}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col xs:flex-row sm:flex-row items-start xs:items-center sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white text-base sm:text-lg font-bold shadow-md">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user?.name ?? "Your Name"}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email ?? "your@email.com"}</p>
              <span className="inline-block mt-1 text-xs font-semibold bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                ✅ Active
              </span>
            </div>
          </div>
          <a
            href="/profile"
            className="shrink-0 flex items-center gap-2 bg-gray-900 hover:bg-gray-700 active:scale-95 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 w-full xs:w-auto sm:w-auto justify-center"
          >
            <UserIcon /> Edit Profile
          </a>
        </div>

      </div>
    </div>
  )
}