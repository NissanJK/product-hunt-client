import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    expiryDate: "",
    description: "",
    discountAmount: 0,
  });
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/coupons")
      .then((res) => setCoupons(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  const handleAddCoupon = (e) => {
    e.preventDefault();
    axiosSecure.post("/coupons", newCoupon)
      .then(() => {
        toast.success("Coupon added successfully");
        setCoupons([...coupons, newCoupon]);
        setNewCoupon({ code: "", expiryDate: "", description: "", discountAmount: 0 });
      })
      .catch((err) => toast.error("Failed to add coupon"));
  };

  const handleDeleteCoupon = (id) => {
    axiosSecure.delete(`/coupons/${id}`)
      .then(() => {
        toast.success("Coupon deleted successfully");
        setCoupons(coupons.filter(coupon => coupon._id !== id));
      })
      .catch((err) => toast.error("Failed to delete coupon"));
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <h2 className="text-3xl font-bold mb-8">Manage Coupons</h2>
      <form onSubmit={handleAddCoupon} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Coupon Code"
            value={newCoupon.code}
            onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
            className="p-2 border rounded-lg"
            required
          />
          <input
            type="date"
            placeholder="Expiry Date"
            value={newCoupon.expiryDate}
            onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
            className="p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newCoupon.description}
            onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
            className="p-2 border rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Discount Amount"
            value={newCoupon.discountAmount}
            onChange={(e) => setNewCoupon({ ...newCoupon, discountAmount: e.target.value })}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Add Coupon
        </button>
      </form>
      <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="p-4">Code</th>
            <th className="p-4">Expiry Date</th>
            <th className="p-4">Description</th>
            <th className="p-4">Discount</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id} className="border-b">
              <td className="p-4">{coupon.code}</td>
              <td className="p-4">{coupon.expiryDate}</td>
              <td className="p-4">{coupon.description}</td>
              <td className="p-4">${coupon.discountAmount}</td>
              <td className="p-4">
                <button
                  onClick={() => handleDeleteCoupon(coupon._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCoupons;