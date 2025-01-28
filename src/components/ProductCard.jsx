import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

const ProductCard = ({ product, onUpvote, isOwner }) => {
  if (!product) {
    return <div>Loading...</div>;
  }

  const tags = Array.isArray(product?.tags) ? product.tags : [];

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={product.image || ""}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="badge badge-outline">
              {tag}
            </span>
          ))}
        </div>
        <div className="card-actions justify-end">
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