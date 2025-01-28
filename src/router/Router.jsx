import {
    createBrowserRouter,
    Navigate, // Import Navigate for redirection
} from "react-router-dom";
import Error from "../pages/Error";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProductsPage from "../pages/ProductsPage";
import ProductDetails from "../pages/ProductDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import MyProfile from "../pages/MyProfile";
import AddProduct from "../pages/AddProduct";
import MyProducts from "../pages/MyProducts";
import ReviewQueue from "../pages/ReviewQueue";
import Statistics from "../pages/Statistics";
import ReportedContent from "../pages/ReportedContent";
import ManageUsers from "../pages/ManageUsers";
import ManageCoupons from "../pages/ManageCoupons";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/products",
                element: <ProductsPage />,
            },
            {
                path: "/products/:id",
                element: <PrivateRoute><ProductDetails /></PrivateRoute>,
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "",
                element: <Navigate to="my-profile" replace />,
            },
            {
                path: "my-profile",
                element: <MyProfile />
            },
            {
                path: "add-product",
                element: <AddProduct />
            },
            {
                path: "my-products",
                element: <MyProducts />
            },
            {
                path: "review-queue",
                element: <ReviewQueue />
            },
            {
                path: "reported-contents",
                element: <ReportedContent />
            },
            {
                path: "statistics",
                element: <Statistics />
            },
            {
                path: "manage-users",
                element: <ManageUsers />
            },
            {
                path: "manage-coupons",
                element: <ManageCoupons />
            },
        ],
    },
]);

export default router;