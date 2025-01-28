import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: products = [] } = useQuery({
    queryKey: ["my-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/my-products");
      return res.data;
    },
  });

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Tags</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-gray-500">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">
                  <img
                    src={product.image || ""}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border p-2">{product.description}</td>
                <td className="border p-2">{product.tags}</td>
                <td className="border p-2">{product.status}</td>
                <td className="border p-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    Update
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyProducts;
