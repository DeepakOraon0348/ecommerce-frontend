import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-semibold tracking-wide">
            🛍️ VibeCommerce
          </Link>

          {/* Hamburger button (visible only on small screens) */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-300">
              Products
            </Link>

            {token ? (
              <>
                <Link to="/cart" className="hover:text-gray-300">
                  Cart
                </Link>
                <Link to="/orders" className="hover:text-gray-300">
                  Orders
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-300">
                  Login
                </Link>
                <Link to="/register" className="hover:text-gray-300">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-800 transition-all duration-300 overflow-hidden ${
          open ? "max-h-60 p-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col space-y-3">
          <Link to="/" className="hover:text-gray-300" onClick={() => setOpen(false)}>
            Products
          </Link>

          {token ? (
            <>
              <Link to="/cart" className="hover:text-gray-300" onClick={() => setOpen(false)}>
                Cart
              </Link>
              <Link to="/orders" className="hover:text-gray-300" onClick={() => setOpen(false)}>
                Orders
              </Link>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-300" onClick={() => setOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
