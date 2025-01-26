import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import AuthFooter from "../../components/auth/AuthFooter";
import AuthForm from "../../components/auth/AuthForm";
import AuthHeader from "../../components/auth/AuthHeader";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;
      await updateUserProfile(data.name, data.photoURL);

      const userInfo = {
        name: data.name,
        email: data.email,
      };
      await axiosPublic.post("/users", userInfo);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Your account has been created.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error.message);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <AuthHeader title="Create an Account" />
        <AuthForm onSubmit={onSubmit} isLogin={false} />
        <SocialLogin />
        <AuthFooter text="Already have an account?" linkText="Login" linkTo="/login" />
      </div>
    </div>
  );
};

export default Register;