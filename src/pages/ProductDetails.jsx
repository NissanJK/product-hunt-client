import { useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaArrowUp, FaFlag } from "react-icons/fa";
import { Helmet } from "react-helmet";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const {
    data: reviews = [],
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const upvoteMutation = useMutation({
    mutationFn: () => axiosSecure.patch(`/products/upvote/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["product", id]);
      Swal.fire({
        icon: "success",
        title: "Upvoted!",
        text: "Your upvote has been recorded.",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to Upvote",
        text: "You can only upvote once.",
      });
    },
  });

  const handleUpvote = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please log in to upvote this product.",
      });
      return;
    }
    upvoteMutation.mutate();
  };

  const reportMutation = useMutation({
    mutationFn: () => axiosSecure.post(`/products/report/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["product", id]);
      Swal.fire({
        icon: "success",
        title: "Product Reported",
        text: "Thank you for reporting this product.",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to Report",
        text: "You can only report once.",
      });
    },
  });

  const handleReport = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please log in to report this product.",
      });
      return;
    }
    reportMutation.mutate();
  };

  const reviewMutation = useMutation({
    mutationFn: (review) => axiosSecure.post("/reviews", review),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Review Submitted",
        text: "Thank you for your review!",
      });
      reset();
      queryClient.invalidateQueries(["reviews", id]);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to Submit Review",
        text: "Please try again later.",
      });
    },
  });

  const onSubmitReview = (data) => {
    const review = {
      productId: id,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      description: data.description,
      rating: data.rating,
    };
    reviewMutation.mutate(review);
  };

  if (isProductLoading || isReviewsLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (isProductError || isReviewsError) {
    return <div className="text-center py-8 text-red-500">Failed to load data. Please try again later.</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found.</div>;
  }

  return (
    <div className="my-12 max-w-7xl mx-auto px-4">
      <Helmet>
        <title>TechNest | {product.name} Details</title>
      </Helmet>
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="card-actions justify-end mt-4">
            <button onClick={handleUpvote} className="btn btn-sm btn-primary text-white shadow-md hover:shadow-lg transition-all">
              <FaArrowUp className="mr-2" /> {product.upvotes}
            </button>
            <button onClick={handleReport} className="btn btn-sm btn-error text-white shadow-md hover:shadow-lg transition-all ml-2">
              <FaFlag className="mr-2" /> Report
            </button>
          </div>
        </div>
      </div>

      <div className="my-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review._id} className="card bg-base-100 shadow-xl p-4 rounded-lg">
                <div className="card-body">
                  <div className="flex items-center gap-4">
                    <img
                      src={review.reviewerImage}
                      alt={review.reviewerName}
                      className="w-12 h-12 rounded-full border-2 border-primary"
                    />
                    <h3 className="font-semibold text-lg text-gray-800">{review.reviewerName}</h3>
                  </div>
                  <p className="text-gray-700 mt-3">{review.description}</p>
                  <div className="rating mt-4">
                    {Array.from({ length: 5 }, (_, i) => (
                      <input
                        key={i}
                        type="radio"
                        name="rating"
                        className="mask mask-star-2 bg-orange-400"
                        checked={review.rating === i + 1}
                        readOnly
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {user && (
        <div className="my-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Post a Review</h2>
          <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-lg">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium">Review Description</span>
              </label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className="textarea textarea-bordered w-full p-4 text-lg rounded-lg border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Write your review..."
              ></textarea>
              {errors.description && (
                <span className="text-red-500 text-sm">{errors.description.message}</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium">Rating</span>
              </label>
              <select
                {...register("rating", { required: "Rating is required" })}
                className="select select-bordered w-full p-4 text-lg rounded-lg border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a rating</option>
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </select>
              {errors.rating && (
                <span className="text-red-500 text-sm">{errors.rating.message}</span>
              )}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full py-3 text-xl">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
