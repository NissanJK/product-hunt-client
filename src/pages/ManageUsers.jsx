import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure.get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  const handleMakeModerator = (id) => {
    axiosSecure.patch(`/users/make-moderator/${id}`)
      .then(() => {
        toast.success("User promoted to Moderator");
        setUsers(users.map(u => u._id === id ? { ...u, role: "moderator" } : u));
      })
      .catch((err) => toast.error("Failed to promote user"));
  };

  const handleMakeAdmin = (id) => {
    axiosSecure.patch(`/users/make-admin/${id}`)
      .then(() => {
        toast.success("User promoted to Admin");
        setUsers(users.map(u => u._id === id ? { ...u, role: "admin" } : u));
      })
      .catch((err) => toast.error("Failed to promote user"));
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <h2 className="text-3xl font-bold mb-8">Manage Users</h2>
      <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role}</td>
              <td className="p-4">
                {user.role !== "moderator" && (
                  <button
                    onClick={() => handleMakeModerator(user._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Make Moderator
                  </button>
                )}
                {user.role !== "admin" && (
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  >
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;