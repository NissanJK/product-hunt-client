import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaArrowUp, FaFlag } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
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
      Swal.fire({
        icon: "success",
        title: "Product Reported",
        text: "Thank you for reporting this product.",
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-12">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>{product.description}</p>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span key={index} className="badge badge-outline">
                {tag}
              </span>
            ))}
          </div>
          <div className="card-actions justify-end">
            <button onClick={handleUpvote} className="btn btn-sm">
              <FaArrowUp className="mr-2" /> {product.upvotes}
            </button>
            <button onClick={handleReport} className="btn btn-sm btn-error">
              <FaFlag className="mr-2" /> Report
            </button>
          </div>
        </div>
      </div>

      <div className="my-12">
        <h2 className="text-3xl font-bold mb-8">Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-10 h-10 rounded-full"
                  />
                  <h3 className="font-bold">{review.reviewerName}</h3>
                </div>
                <p>{review.description}</p>
                <div className="rating">
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
      </div>

      <div className="my-12">
        <h2 className="text-3xl font-bold mb-8">Post a Review</h2>
        <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Reviewer Name</span>
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Reviewer Image</span>
            </label>
            <input
              type="text"
              value={user?.photoURL || ""}
              readOnly
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Review Description</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered"
              placeholder="Write your review..."
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <select
              {...register("rating", { required: true })}
              className="select select-bordered"
            >
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;