import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

const FeaturedProducts = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: featuredProducts = [], isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products/featured");
      return res.data;
    },
  });

  const upvoteMutation = useMutation({
    mutationFn: (productId) => axiosPublic.patch(`/products/upvote/${productId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["featuredProducts"]); 
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
      <h2 className="text-4xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 mx-auto">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onUpvote={handleUpvote}
            isOwner={product.owner === user?.email}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;