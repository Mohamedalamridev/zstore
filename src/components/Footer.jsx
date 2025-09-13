import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white">Zstore</h2>
          <p className="text-sm mt-2">
            Your favorite fashion store for the latest trends.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-2 text-sm">
          <a href="/" className="hover:text-white transition">
            Shop
          </a>
          <a href="/about" className="hover:text-white transition">
            About
          </a>
          <a href="/contact" className="hover:text-white transition">
            Contact
          </a>
          <a href="/privacy" className="hover:text-white transition">
            Privacy Policy
          </a>
        </div>

        {/* Social */}
        <div className="flex space-x-4 items-center">
          <a href="#" className="hover:text-white">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-white">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-500 mt-8">
        © {new Date().getFullYear()} Zstore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
