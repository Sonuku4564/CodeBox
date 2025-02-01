import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { loginWithRedirect } = useAuth0();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/logo.jpg" alt="Logo" width={100} height={150} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-500">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">Features</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">Pricing</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">Contact Us</a>
          </div>

          {/* Login Button */}
          <div className="hidden md:flex">
            <button onClick={() => loginWithRedirect()}
             className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Features</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Pricing</a>
            <button onClick={() => loginWithRedirect()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</button>
          </div>
        )}
      </div>
    </nav>
  );
}
