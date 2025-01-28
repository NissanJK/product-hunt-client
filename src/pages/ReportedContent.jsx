import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const ReportedContent = () => {
    const [reportedProducts, setReportedProducts] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get("/products/reported")
            .then((res) => setReportedProducts(res.data))
            .catch((err) => console.error(err));
    }, [axiosSecure]);

    const handleDeleteProduct = (id) => {
        axiosSecure.delete(`/products/${id}`)
            .then(() => {
                toast.success("Product deleted successfully");
                setReportedProducts(reportedProducts.filter(product => product._id !== id));
            })
            .catch((err) => toast.error("Failed to delete product"));
    };

    return (
        <div className="container mx-auto p-4 text-black">
            <Helmet>
                <title>TechNest | Reported Content</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-8">Reported Content</h2>
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-indigo-600 text-white">
                    <tr>
                        <th className="p-4">Product Name</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reportedProducts.map((product) => (
                        <tr key={product._id} className="border-b">
                            <td className="p-4">{product.name}</td>
                            <td className="p-4">
                                <button
                                    onClick={() => handleDeleteProduct(product._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportedContent;