import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { loginWithRedirect } = useAuth0();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "features", "pricing", "contact"];
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/logo.jpg" alt="Logo" width={100} height={150} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink section="home" activeSection={activeSection}>Home</NavLink>
            <NavLink section="features" activeSection={activeSection}>Features</NavLink>
            <NavLink section="pricing" activeSection={activeSection}>Pricing</NavLink>
            <NavLink section="contact" activeSection={activeSection}>Contact Us</NavLink>
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
            <MobileNavLink section="home" setIsOpen={setIsOpen}>Home</MobileNavLink>
            <MobileNavLink section="features" setIsOpen={setIsOpen}>Features</MobileNavLink>
            <MobileNavLink section="pricing" setIsOpen={setIsOpen}>Pricing</MobileNavLink>
            <MobileNavLink section="contact" setIsOpen={setIsOpen}>Contact Us</MobileNavLink>
            <button onClick={() => loginWithRedirect()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full">Login</button>
          </div>
        )}
      </div>
    </nav>
  );
}

const NavLink = ({ section, activeSection, children }) => (
  <Link to={section} smooth={true} duration={500} offset={-70}
    className={`text-gray-700 cursor-pointer hover:text-blue-500 ${activeSection === section ? "text-blue-500 font-bold" : ""}`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ section, setIsOpen, children }) => (
  <Link to={section} smooth={true} duration={500} offset={-70} onClick={() => setIsOpen(false)}
    className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100">
    {children}
  </Link>
);
