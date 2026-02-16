import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {Input, Button, Logo} from "./index.js";
import { useForm } from "react-hook-form";
import {useNavigate, Link} from "react-router-dom";
// import { useLoginUserMutation } from "../store/api/userApi.js";

import {loginUser, getCurrentUser} from "../store/slices/authSlice.js"

function Login() {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const {isAuthenticated, loading} = useSelector((state) => state.auth);
    

    const login = async(data) => {
        setError("");
        try {
        const resultAction = await dispatch(loginUser(data)).unwrap();
          if (loginUser.fulfilled.match(resultAction)) {
            await dispatch(getCurrentUser());
          }
        } catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

  return (
    <div
      className='flex items-center justify-center w-full relative z-50 backdrop-blur-sm'
    >
      <div className={`mx-auto w-full max-w-lg bg-gray-700 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center align-middle items-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
      {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
      <form onSubmit={handleSubmit(login)} className="mt-8">
       <div className="space-5-y space-y-4">
        <div>
          <Input
              label="Username"
              placeholder="Enter your username"
              {...register("username", {
                  required: "Username is Required!",
              })}
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
            type="email"
            placeholder="Enter your Email "
            {...register("email", {
              required: "Email is required",
               pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                  
                },
              // validate: {
              //   matchPatern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
              //         message: "Email address must be a vaild address",
              // }
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
            label="Password" type="password"
            placeholder="Enter your password"
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
          <Link to='/changePassword' className="gap-y-4">
            Change Password
          </Link>
        </div>
      
        <div className="flex justify-center align-middle items-center">
          <Button type="submit" className="p-3" disabled={loading} >
              {loading ? "Signing in..." : "Sign in"}
          </Button>
        </div>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Login;
