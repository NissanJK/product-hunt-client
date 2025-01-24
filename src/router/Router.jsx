import {
    createBrowserRouter,
} from "react-router-dom";
import Error from "../pages/Error";
import Layout from "../layout/Layout";
import Home from "../pages/Home";

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
        ]
    },
]);

export default router;