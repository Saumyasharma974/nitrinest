import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      alert("Please login to continue");
      navigate("/login");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full min-h-screen bg-[linear-gradient(200deg,#4C98F7_60%,#B0A7F9_100%)] flex items-center"
    >
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 text-white text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          >
            Track Your Nutrition <br /> with{" "}
            <span className="underline decoration-white decoration-4">NitriNest</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl mb-6 px-4 md:px-0"
          >
            Stay on top of your health. Effortlessly log your meals, track calories, and reach your fitness goals.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="bg-white text-blue-600 font-semibold px-6 sm:px-10 py-3 rounded-full shadow-md hover:shadow-xl transition"
          >
            Get Started
          </motion.button>
        </div>

        {/* Right Content (App Preview Image) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <motion.img
            src="/quaote.jpg"
            alt="NitriNest App Preview"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-64 sm:w-72 md:w-80 lg:w-96 drop-shadow-2xl"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
