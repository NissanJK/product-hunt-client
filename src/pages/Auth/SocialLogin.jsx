import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      await axiosPublic.post("/users", userInfo);

      Swal.fire({
        icon: "success",
        title: "Google Sign-In Successful!",
        text: "You have successfully signed in with Google.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error("Google sign-in failed:", error.message);
      Swal.fire({
        icon: "error",
        title: "Google Sign-In Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleGoogleSignIn}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <img
            className="h-5 w-5"
            src="https://www.google.com/favicon.ico"
            alt="Google"
          />
          <span className="ml-2">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;