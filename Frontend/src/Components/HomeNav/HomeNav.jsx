import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const HomeNav = () => {
  const { user, logout } = useAuth0();
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/logo.jpg" alt="Logo" width={100} height={150} />
          </div>


          {/* Login Button */}
          <div className="hidden md:flex">
            <button onClick={() => logout({ returnTo: window.location.origin })}
             className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Logout</button>
          </div>
      </div>
      </div>
    </nav>    
  )
}

export default HomeNav