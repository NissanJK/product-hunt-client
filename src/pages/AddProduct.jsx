import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const product = {
      ...data,
      owner: user.email,
      ownerName: user.displayName,
      ownerImage: user.photoURL,
      status: "pending",
      createdAt: new Date(),
    };
    const res = await axiosSecure.post("/products", product);
    if (res.data.insertedId) {
      Swal.fire("Success", "Product added successfully!", "success");
      reset();
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("image", { required: true })}
          placeholder="Product Image URL"
          className="w-full p-2 border rounded"
        />
        <textarea
          {...register("description", { required: true })}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("tags", { required: true })}
          placeholder="Tags (comma-separated)"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("externalLink", { required: true })}
          placeholder="External Link"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;