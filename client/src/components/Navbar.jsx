import React, { useState, useContext } from "react";
import { CgProfile } from "react-icons/cg";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    logoutUser();
    setIsOpen(false);
    navigate("/"); // Navigate to Home after logout
  };

  return (
    <nav className="flex justify-between items-center px-6 md:px-10 lg:px-70 py-4 h-16 text-white text-lg md:text-xl font-semibold bg-[linear-gradient(200deg,#0066EE_60%,#9383FB_100%)]">
      {/* Left Section (Logo) */}
      <div className="left">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">NitriNest</h1>
      </div>

      {/* Right Section (Profile Icon with Popup) */}
      <div className="right">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <CgProfile className="text-2xl md:text-3xl cursor-pointer" />
          </DialogTrigger>

          {/* Full-Screen Blurred Background */}
          <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50" />

          {/* Centered Popup */}
          <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 md:p-6 rounded-lg shadow-lg w-72 md:w-96 max-w-full z-50">
            <DialogTitle className="sr-only">Navigation</DialogTitle>
            <div>
              <h2 className="text-lg md:text-xl font-bold mb-4 text-center text-gray-800">
                Welcome to NitriNest
              </h2>
              <div className="flex flex-col gap-3 md:gap-4">
                {user ? (
                  <>
                    <button
                      onClick={handleLogout}
                      className="block text-center bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => handleNavigation("/contact")}
                      className="block text-center bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
                    >
                      Contact Us
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleNavigation("/login")}
                      className="block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => handleNavigation("/signup")}
                      className="block text-center bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                    >
                      Sign Up
                    </button>
                    <button
                      onClick={() => handleNavigation("/contact")}
                      className="block text-center bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
                    >
                      Contact Us
                    </button>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default Navbar;
