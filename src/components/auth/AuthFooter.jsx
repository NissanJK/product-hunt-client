import { Link } from "react-router-dom";

const AuthFooter = ({ text, linkText, linkTo }) => {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-600">
        {text}{" "}
        <Link to={linkTo} className="font-medium text-blue-600 hover:text-blue-500">
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default AuthFooter;