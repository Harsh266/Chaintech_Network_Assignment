import Navbar from "../components/Navbar"

function Dashboard() {

  const session = JSON.parse(localStorage.getItem("session"))
  const user = session?.user

  return (

    <div className="flex h-screen bg-gray-100">

      <div className="flex-1 flex flex-col">

        <Navbar userName={user?.name} />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-4">
            Welcome {user?.name}
          </h1>

          <p className="text-gray-600">
            Explore products, manage your cart and update your profile.
          </p>

        </div>

      </div>

    </div>
  )
}

export default Dashboard