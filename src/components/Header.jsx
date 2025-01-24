import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState({
        name: "Jawadul Karim",
        profilePic: "",
    });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const logout = () => {
        console.log("User logged out");
        setUser(null);
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "font-bold text-white bg-gray-700 px-4 py-2 rounded-lg"
                            : "text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/products"
                    className={({ isActive }) =>
                        isActive
                            ? "font-bold text-white bg-gray-700 px-4 py-2 rounded-lg"
                            : "text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300"
                    }
                >
                    Products
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="bg-gray-900 shadow-lg sticky top-0 z-50">
            <nav className="container w-11/12 mx-auto flex items-center justify-between p-4">
                <div className="flex items-center">
                    <NavLink
                        to="/"
                        className="text-xl font-bold flex items-center gap-2 text-white"
                    >
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
                                    className="btn btn-primary btn-sm text-white hover:bg-blue-600 transition-colors duration-300"
                                >
                                    Log In
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/register"
                                    className="btn btn-secondary btn-sm text-white hover:bg-purple-600 transition-colors duration-300"
                                >
                                    Register
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <li className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center gap-2 focus:outline-none"
                            >
                                <img
                                    src={user.profilePic}
                                    alt="User"
                                    className="w-10 h-10 rounded-full border-2 border-blue-500 hover:border-blue-600 transition-colors duration-300"
                                />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                                    <p className="px-4 py-2 text-gray-700 border-b bg-gray-100">
                                        {user.name || "User"}
                                    </p>
                                    <NavLink
                                        to="/dashboard"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                                    >
                                        Dashboard
                                    </NavLink>
                                    <button
                                        onClick={logout}
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
                    >
                        {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
                    </button>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="lg:hidden bg-gray-800 w-48 absolute top-16 right-5 z-40 shadow-lg rounded-md overflow-hidden">
                    <ul className="p-4 space-y-2">
                        {!user ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "font-bold text-white underline"
                                                : "text-white hover:underline"
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/products"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "font-bold text-white underline"
                                                : "text-white hover:underline"
                                        }
                                    >
                                        Products
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/login"
                                        className="btn btn-primary btn-sm text-white w-full mt-2 hover:bg-blue-600 transition-colors duration-300"
                                    >
                                        Log In
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/register"
                                        className="btn btn-secondary btn-sm text-white w-full mt-2 hover:bg-purple-600 transition-colors duration-300"
                                    >
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <p className="text-white pt-1 font-black">{user.name || "User"}</p>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "font-bold text-white underline"
                                                : "text-white hover:underline"
                                        }
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "font-bold text-white underline"
                                                : "text-white hover:underline"
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/products"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "font-bold text-white underline"
                                                : "text-white hover:underline"
                                        }
                                    >
                                        Products
                                    </NavLink>
                                </li>
                                <li className="pt-4">
                                    <button
                                        onClick={logout}
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