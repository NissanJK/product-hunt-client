import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Helmet } from "react-helmet";

const ProductsPage = () => {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all products once
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  });

  // Client-side filtering
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) return <div className="flex justify-center items-center h-svh"><span className="loading loading-infinity loading-lg"></span></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="py-10 bg-gray-800">
      <Helmet>
        <title>TechNest | All Products</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-8">All Products</h2>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered w-11/12 max-w-md"
          aria-label="Search products"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 mx-auto">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;