import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet";

const ProductsPage = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: { products = [], totalPages = 1 } = {},
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products", searchTerm, page],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/search?term=${searchTerm}&page=${page}`);
      return res.data;
    },
    keepPreviousData: true, 
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); 
  };

  const handleUpvote = async (productId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await axiosPublic.patch(`/products/upvote/${productId}`);
      refetch();
    } catch (error) {
      console.error("Upvote failed:", error.message);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="my-12">
      <Helmet>
        <title>TechNest | All Products</title>
        <meta
          name="description"
          content="Browse all products available on TechNest. Find the latest tech products and gadgets."
        />
        <meta name="keywords" content="tech, products, gadgets, electronics" />
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-8">All Products</h2>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by tags..."
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered w-11/12 max-w-md"
          aria-label="Search products by tags"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onUpvote={handleUpvote}
            isOwner={product.owner === user?.email}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <div className="join">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="join-item btn"
          >
            ««
          </button>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="join-item btn"
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`join-item btn ${page === i + 1 ? "btn-active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="join-item btn"
          >
            »
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="join-item btn"
          >
            »»
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
