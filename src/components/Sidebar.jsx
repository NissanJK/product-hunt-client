import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import useModerator from "../hooks/useModerator";

const Sidebar = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/my-profile"
            className="block p-2 hover:bg-gray-700 rounded"
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
              >
                Add Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-products"
                className="block p-2 hover:bg-gray-700 rounded"
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
              >
                Review Queue
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/reported-contents"
                className="block p-2 hover:bg-gray-700 rounded"
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
              >
                Statistics
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-users"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-coupons"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Manage Coupons
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;