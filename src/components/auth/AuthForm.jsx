import { useForm } from "react-hook-form";

const AuthForm = ({ onSubmit, isLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {!isLogin && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
          type="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </div>
      {!isLogin && (
        <div>
          <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
            Photo URL
          </label>
          <input
            {...register("photoURL")}
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        {isLogin ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;