import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#004AAD] text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* About NitriNest */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-4">About NitriNest</h3>
          <p className="text-sm leading-relaxed">
            NitriNest helps you take control of your health by tracking your food, exercise, and nutrition. Achieve your fitness goals with ease.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-4">Explore</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">How It Works</a></li>
            <li><a href="#" className="hover:underline">Features</a></li>
            <li><a href="#" className="hover:underline">Community</a></li>
            <li><a href="#" className="hover:underline">Success Stories</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">FAQs</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:opacity-75">
              <img src="/gmail_logo.png" alt="Gmail" className="w-6 sm:w-8" />
            </a>
            <a href="#" className="hover:opacity-75">
              <img src="/instagram_logo.png" alt="Instagram" className="w-6 sm:w-8" />
            </a>
            <a href="#" className="hover:opacity-75">
              <img src="/linkedin_logo.png" alt="LinkedIn" className="w-6 sm:w-8" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="text-center mt-10 text-sm border-t border-white/20 pt-4">
        © {new Date().getFullYear()} NitriNest. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
