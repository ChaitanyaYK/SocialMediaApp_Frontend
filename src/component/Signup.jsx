import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {Logo, Input, Button} from "./index.js";
import { registerUser, getCurrentUser } from "../store/authSlice.js";
import {toast} from 'react-toastify';


function Signup() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: { errors }} = useForm();

    const { error, isAuthenticated, loading } = useSelector((state) => state.auth);

    const create = async (data) => {
      try {
        // setLoading("")
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("username", data.username);
        formData.append("fullName", data.fullName);
        formData.append("password", data.password);

        if (data.avatar?.[0]) {
            formData.append("avatar", data.avatar[0]);
        }

        if(data.coverImage?.[0]) {
            formData.append("coverImage", data.coverImage[0]);
        }

        const resultAction = await dispatch(registerUser(formData));
        if (registerUser.fulfilled.match(resultAction)) {
            //fetch current user data
            await dispatch(getCurrentUser());
          toast.success("Login successful!")
          navigate("/");
        } else {
            console.log("Registration failed:", resultAction.payload); 
        }
      } catch (err) {
        console.error("Error while Signup:",err.message);
      }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

  return (
    <div>
      <div className="flex items-center justify-center">
          <div className={`mx-auto w-full max-w-lg bg-gray-700 rounded-xl p-10 border border-black/10`}>
              <div className="mb-2 flex justify-center">
                  <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have any account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center" >{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name"
                            placeholder="Enter your Full Name"
                            {...register("fullName", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Username"
                            placeholder="Enter your username"
                            {...register("username", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"

                            // here we write "...register(key, value)" because ham agar kisi dusare input filed me bhi register likhate hai to usaki value override ho jayegi
                            // Syntax:  ...register(key, value)    // Here key is email & value is pass in Object {}
                            {...register("email", {
                                required: true,
                                validate: {    // This pattern is called regEx
                                    matchPatern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                                        "Email address must be a vaild address",
                                }
                            })}
                        />
                        <Input 
                            label="Password"
                            placeholder="Enter your Password"
                            type="password"
                            {...register("password",{
                                required:true,
                                validate: {
                                    matchpatern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,20}$/.test(value) ||
                                    "Password does not meet requirements"
                            }
                        })}
                        />
                        <Input
                            label="Avatar"
                            type="file"
                            placeholder="Upload Avatar Image"
                            accept="image/*"
                            {...register("avatar", { required: true })}
                        />
                        <Input
                            label="Cover Image"
                            type="file"
                            placeholder="Upload Cover Image"
                            accept="image/*"
                            {...register("coverImage")}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Creating..." : "Create Account"}
                        </Button>
                    </div>
                </form>
            </div>
      </div>
    </div>
  );
}

export default Signup;
