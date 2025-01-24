import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container w-11/12 mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center border-b border-gray-700 pb-8 gap-6">
          <div className="flex flex-col items-start">
            <div className="flex gap-2 items-center text-2xl font-bold text-white">
              TechNest
              <span className="btn btn-circle btn-outline italic font-black text-2xl bg-white text-black">
                TN
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Your go-to platform for the latest tech gadgets and innovations.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-white">Contact Us</h2>
            <p className="mt-2 text-sm text-gray-400">Email: support@technest.com</p>
            <p className="text-sm text-gray-400">Phone: +880 171207****</p>
            <p className="text-sm text-gray-400">Address: ABC Road, Chattogram, Bangladesh</p>
          </div>

          <div className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-white">Follow Us</h2>
            <div className="flex gap-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center pt-8">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TechNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;