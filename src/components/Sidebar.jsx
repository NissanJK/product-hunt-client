import { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import useModerator from "../hooks/useModerator";

const Sidebar = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="sticky w-fit h-fit top-4 left-4 p-2 bg-gray-800 text-white rounded-lg z-50 lg:hidden"
      >
        {isDrawerOpen ? "✕" : "☰"}
      </button>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleDrawer}
        ></div>
      )}
      <div
        className={`fixed lg:relative w-64 bg-gray-800 text-white p-4 h-screen transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } z-50`}
      >
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              exact
              className="block p-2 hover:bg-gray-700 rounded"
              activeClassName="bg-gray-700"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-profile"
              className="block p-2 hover:bg-gray-700 rounded"
              activeClassName="bg-gray-700"
            >
              My Profile
            </NavLink>
          </li>
          {!isAdmin && !isModerator && (
            <>
              <li>
                <NavLink
                  to="/dashboard/add-product"
                  className="block p-2 hover:bg-gray-700 rounded"
                  activeClassName="bg-gray-700"
                >
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-products"
                  className="block p-2 hover:bg-gray-700 rounded"
                  activeClassName="bg-gray-700"
                >
                  My Products
                </NavLink>
              </li>
            </>
          )}
          {isModerator && (
            <>
              <li>
                <NavLink
                  to="/dashboard/review-queue"
                  className="block p-2 hover:bg-gray-700 rounded"
                  activeClassName="bg-gray-700"
                >
                  Review Queue
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/reported-contents"
                  className="block p-2 hover:bg-gray-700 rounded"
                  activeClassName="bg-gray-700"
                >
                  Reported Contents
                </NavLink>
              </li>
            </>
          )}
          {isAdmin && (
            <>
              <li>
                <NavLink
                  to="/dashboard/statistics"
                  className="block p-2 hover:bg-gray-700 rounded"
                  activeClassName="bg-gray-700"
                >
                  Statistics
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-users"
                  className="block p-2 hover:bg-gray-700 rounded"
                  activeClassName="bg-gray-700"
                >
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-coupons"
                  className="block p-2 hover:bg-gray-700 rounded"
                  activeClassName="bg-gray-700"
                >
                  Manage Coupons
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;