import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

const ProductCard = ({ product, onUpvote, isOwner }) => {
  if (!product) {
    return <div className="flex justify-center items-center h-svh"><span className="loading loading-infinity loading-lg"></span></div>;
  }

  const tags = Array.isArray(product?.tags) ? product.tags : [];

  return (
    <div className="card bg-gray-700 shadow-xl h-96 w-full flex flex-col">
      <figure className="h-1/2">
        <img
          src={product.image || ""}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body flex-grow">
        <h2 className="card-title">
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </h2>
        <p className="text-sm text-gray-200 line-clamp-3">{product.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="badge badge-outline">
              {tag}
            </span>
          ))}
        </div>
        <div className="card-actions justify-between mt-auto">
          <Link to={`/products/${product._id}`} className="btn btn-sm btn-primary">
            See more
          </Link>
          <button
            onClick={() => onUpvote(product._id)}
            disabled={isOwner}
            className="btn btn-sm"
          >
            <FaArrowUp className="mr-2" /> {product.upvotes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;