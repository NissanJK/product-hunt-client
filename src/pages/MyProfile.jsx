import PaymentForm from "../components/PaymentForm";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet";

const MyProfile = () => {
  const { user } = useAuth();
  const subscriptionPrice = 100;

  return (
    <div className="bg-gray-200 text-black p-6 rounded-lg shadow-md mx-auto h-screen">
      <Helmet>
        <title>TechNest | My Profile</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>
      <div className="flex flex-col items-center space-y-4">
        <img src={user?.photoURL} alt="Profile" className="w-32 h-32 rounded-full border-2 border-gray-300" />
        <p className="text-lg"><strong>Name:</strong> {user?.displayName}</p>
        <p className="text-lg"><strong>Email:</strong> {user?.email}</p>
        <p className="text-lg"><strong>Phone:</strong> {user?.phoneNumber || "Not Provided"}</p>
        <p className="text-lg"><strong>Address:</strong> {user?.address || "Not Provided"}</p>
        {!user?.isSubscribed ? (
          <PaymentForm subscriptionPrice={subscriptionPrice} />
        ) : (
          <p className="text-green-500 text-lg font-semibold">Membership Status: Verified</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
