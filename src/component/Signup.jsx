import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Logo, Input, Button } from "./index.js";
import { registerUser, getCurrentUser } from "../store/slices/authSlice.js";
import { toast } from "react-toastify";


function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { error, isAuthenticated, loading } = useSelector((state) => state.auth);

  const create = async (data) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("username", data.username);
      formData.append("fullName", data.fullName);
      formData.append("password", data.password);

      if (data.avatar?.[0]) {
        formData.append("avatar", data.avatar[0]);
      }
      if (data.coverImage?.[0]) {
        formData.append("coverImage", data.coverImage[0]);
      }

      const resultAction = await dispatch(registerUser(formData));
      if (registerUser.fulfilled.match(resultAction)) {
        await dispatch(getCurrentUser());
        toast.success("Signup successful!");
        navigate("/");
      } else {
        console.log("Registration failed:", resultAction.payload);
      }
    } catch (err) {
      console.error("Error while Signup:", err.message);
      toast.error("Retry to Signup")
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative z-50 min-h-screen flex items-center justify-center bg-neutral-900 px-4">
      <div className="w-full max-w-lg bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-700">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo width="100px" />
        </div>

        <h2 className="text-center text-2xl font-bold text-white">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <p className="text-red-500 text-center mt-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
          
          <div>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>


          <div>
            <Input
              label="Username"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

        
          <div>
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                  
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>


          <div>
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,20}$/,
                  message:
                    "Password must be 8-20 chars, include upper, lower, number & special char",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>


          <div>
            <Input
              label="Avatar"
              type="file"
              accept="image/*"
              {...register("avatar", { required: "Avatar is required" })}
            />
            {errors.avatar && (
              <p className="text-red-500 text-sm mt-1">
                {errors.avatar.message}
              </p>
            )}
          </div>

          
          <div>
            <Input
              label="Cover Image"
              type="file"
              accept="image/*"
              {...register("coverImage")}
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="px-2 py-3 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
