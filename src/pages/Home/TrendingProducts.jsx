import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaArrowUp } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

const TrendingProducts = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: trendingProducts = [], isLoading } = useQuery({
    queryKey: ["trendingProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products/trending");
      return res.data;
    },
  });

  const upvoteMutation = useMutation({
    mutationFn: (productId) => axiosPublic.patch(`/products/upvote/${productId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["trendingProducts"]); 
    },
  });

  const handleUpvote = (productId) => {
    if (!user) {
      navigate("/login");
      return;
    }
    upvoteMutation.mutate(productId);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-svh"><span className="loading loading-infinity loading-lg"></span></div>;
  }

  return (
    <div className="py-12 bg-gray-800">
      <h2 className="text-4xl font-bold text-center mb-8">Trending Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 mx-auto">
        {trendingProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onUpvote={handleUpvote}
            isOwner={product.owner === user?.email}
          />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/products" className="btn btn-primary">
          Show All Products
        </Link>
      </div>
    </div>
  );
};

export default TrendingProducts;