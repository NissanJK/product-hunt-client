import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import useAuth from "../hooks/useAuth";

const useClickOutside = (ref, callback) => {
    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [ref, callback]);
};

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, logOut } = useAuth();
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    useClickOutside(dropdownRef, () => setIsDropdownOpen(false));
    useClickOutside(mobileMenuRef, () => setIsMenuOpen(false));
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleLogout = () => {
        logOut();
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
    };

    const navLinkClass = ({ isActive }) =>
        isActive ? "font-bold text-white bg-gray-700 px-4 py-2 rounded-lg"
            : "text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300";

    const mobileNavLinkClass = ({ isActive }) =>
        isActive ? "font-bold text-white underline"
            : "text-white hover:underline";

    const links = (
        <>
            <li>
                <NavLink to="/" className={navLinkClass}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/products" className={navLinkClass}>
                    Products
                </NavLink>
            </li>
            <li>
                <NavLink to="/about" className={navLinkClass}>
                    About
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink to="/dashboard" className={navLinkClass}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-products" className={navLinkClass}>
                            My Products
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="bg-gray-900 shadow-lg sticky top-0 z-50">
            <nav className="container w-11/12 mx-auto flex items-center justify-between p-4">
                <div className="flex items-center">
                    <NavLink to="/" className="text-xl font-bold flex items-center gap-2 text-white">
                        TechNest
                        <span className="btn btn-circle btn-outline italic font-black text-2xl bg-white text-black">
                            TN
                        </span>
                    </NavLink>
                </div>
                <ul className="hidden lg:flex items-center gap-6">
                    {links}
                    {!user ? (
                        <>
                            <li>
                                <NavLink
                                    to="/login"
                                    className={navLinkClass}
                                >
                                    Log In
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/register"
                                    className={navLinkClass}
                                >
                                    Register
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <li className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center gap-2 focus:outline-none"
                                aria-label="User menu"
                            >
                                <img
                                    src={user.photoURL || ""}
                                    alt="User"
                                    className="w-10 h-10 rounded-full border-2 border-blue-500 hover:border-blue-600 transition-colors duration-300"
                                    onError={(e) => {
                                        e.target.src = "";
                                    }}
                                />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 transition-all duration-300">
                                    <p className="px-4 py-2 text-gray-700 border-b bg-gray-100">
                                        {user.displayName || "User"}
                                    </p>
                                    {/* <NavLink
                                        to="/dashboard"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Dashboard
                                    </NavLink> */}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </li>
                    )}
                </ul>
                <div className="lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="btn btn-ghost text-white hover:bg-gray-700 rounded-lg p-2"
                        aria-label="Toggle navigation menu"
                    >
                        {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                <div
                    className="lg:hidden fixed top-16 inset-x-0 bg-gray-800 z-40 shadow-lg"
                    ref={mobileMenuRef}
                >
                    <ul className="p-4 space-y-2">
                        {!user ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/"
                                        className={mobileNavLinkClass}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/products"
                                        className={mobileNavLinkClass}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Products
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/login"
                                        className={mobileNavLinkClass}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Log In
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/register"
                                        className={mobileNavLinkClass}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="pb-2 border-b border-gray-700">
                                    <p className="text-white font-bold">{user.displayName
                                        || "User"}</p>
                                    <p className="text-gray-400 text-sm">{user.email}</p>
                                </li>
                                {/* <li>
                                    <NavLink
                                        to="/dashboard"
                                        className={mobileNavLinkClass}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/"
                                        className={mobileNavLinkClass}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/products"
                                        className={mobileNavLinkClass}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Products
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/about"
                                        className={mobileNavLinkClass}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        About
                                    </NavLink>
                                </li> */}
                                {links}
                                <li className="pt-4">
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-error btn-outline w-full"
                                    >
                                        Log Out
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Header;