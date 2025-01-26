import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";
import AuthForm from "../../components/auth/AuthForm";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "You have successfully logged in.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <AuthHeader title="Login to ProductHunt" />
        <AuthForm onSubmit={onSubmit} isLogin={true} />
        <SocialLogin />
        <AuthFooter text="Don't have an account?" linkText="Register" linkTo="/register" />
      </div>
    </div>
  );
};

export default Login;