import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const ReviewQueue = () => {
  const axiosSecure = useAxiosSecure();
  const { data: products = [] } = useQuery({
    queryKey: ["review-queue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/review-queue");
      return res.data;
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-black">
      <Helmet>
        <title>TechNest | Review Queue</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Review Queue</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>
                <button className="bg-green-500 text-white px-2 py-1 rounded">
                  Accept
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewQueue;