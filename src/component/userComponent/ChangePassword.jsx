// import { useDispatch, useSelector } from "react-redux";
// import { Input, Button, Logo} from "../index.js";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { changePassword } from "../../store/authSlice.js";
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/ReactToastify.css";


// const ChangePassword = () => {
//     // const {oldPassword, newPassword} = req.body;
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const { isAuthenticated, loading } = useSelector((state) => state.auth);

//     const {register, handleSubmit, formState: {errors}, reset, watch, setValue} = useForm();

//     const newPasswordVal = watch("newPassword");

//     useEffect(() => {
//       setValue("confirmPassword", "");
//     }, [newPasswordVal, setValue])

//     const createNewPassword = async (data) => {
//       try {
//         // const formData = new FormData();
//         // formData.append("newPassword", data.newPassword);
//         // formData.append("oldPassword", data.oldPassword);
        
//         const result = await dispatch(changePassword(data));
//         if(changePassword.fulfilled.match(result)) {
//           toast.success("Password changed successfully", {autoClose: 3000});
//           reset();
//           setTimeout(() => navigate("/"), 2500);
//         } else if (changePassword.rejected.match(result)) {
//           toast.error(resultAction.payload || "Failed to change password", {
//             autoClose: 3000,
//           });
//         }
//       } catch (err) {
//         console.error("Password change failed:", err);
//       }
//     };

//     return (
//         <div className="flex items-center justify-center w-full">
//           <div className={`mx-auto w-full max-w-lg bg-gray-700 rounded-xl p-10 border border-black/10`}>
//             <div className="mb-2 flex justify-start flex-col items-center">
//                     <span className="inline-block w-full max-w-[50px]">
//                         <Logo width="100%" />
//                     </span>
//             </div>
//             <h2 className="text-center text-2xl font-bold leading-tight">Change Password</h2>
//             <form onSubmit={handleSubmit(createNewPassword)}>
//               <div className="space-5-y space-y-4">
//                 <Input
//                   label="Old Password: "
//                   type="password"
//                   placeholder="Enter old password"
//                   className=""
//                   {...register("oldPassword", {
//                     required: "Old password is required",
//                   })}
//                   error={errors.oldPassword?.message}
//                 />
//                 <Input
//                   label="New Password: "
//                   type="password"
//                   placeholder="Enter new password"
//                   className=""
//                   {...register("newPassword", {
//                     required: "New password is required",
//                     validate: {
//                           matchpatern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,20}$/.test(value) ||
//                             "Password must be 8-20 chars, include upper, lower, number, and special char",
//                     }
//                   })}
//                   error={errors.newPassword?.message}
//                 />
//                 <Input
//                   label="Confirm Password: "
//                   type="password"
//                   placeholder="Re-enter new password"
//                   className=""
//                   {...register("confirmPassword", {
//                     required: "Please confirm your new password",
//                     validate: {
//                           matchpatern: (value) => value === newPasswordVal || "Passwords do not match",
//                     }
//                   })}
//                   error={errors.confirmPassword?.message}
//                 />
//                 <Button type="submit" className="w-full" disabled={loading}>
//                   {loading? "Creating Password..." : "Create Password"}
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//     ) 
// }

// export default ChangePassword;


import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Logo } from "../index.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { changePassword } from "../../store/authSlice.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const newPasswordVal = watch("newPassword");

  // Reset confirmPassword when newPassword changes
  useEffect(() => {
    setValue("confirmPassword", "");
  }, [newPasswordVal, setValue]);

  // Local state for toggling visibility
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const createNewPassword = async (data) => {
    try {
      const result = await dispatch(changePassword(data));

      if (changePassword.fulfilled.match(result)) {
        toast.success("Password changed successfully", { autoClose: 3000 });
        reset();
        setTimeout(() => navigate("/"), 2500);
      } else if (changePassword.rejected.match(result)) {
        toast.error(result.payload || "Failed to change password", {
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Password change failed:", err);
    }
  };

  // SVG icons
  const EyeIcon = ({ open }) =>
    open ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.68 21.68 0 0 1 5.11-6.31m3.25-2A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.77 21.77 0 0 1-4.35 5.94M1 1l22 22" />
      </svg>
    );

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-700 rounded-xl p-10 border border-black/10 shadow-lg">
        <div className="mb-2 flex justify-start flex-col items-center">
          <span className="inline-block w-full max-w-[50px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit(createNewPassword)}>
          <div className="space-y-4">
            {/* Old Password */}
            <div className="relative">
              <Input
                label="Old Password"
                type={showOld ? "text" : "password"}
                placeholder="Enter old password"
                {...register("oldPassword", {
                  required: "Old password is required",
                })}
                error={errors.oldPassword?.message}
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-0 top-7"
              >
                <EyeIcon open={showOld} />
              </button>
            </div>

            {/* New Password */}
            <div className="relative">
              <Input
                label="New Password"
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                {...register("newPassword", {
                  required: "New password is required",
                  validate: {
                    matchPattern: (value) =>
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,20}$/.test(
                        value
                      ) ||
                      "Password must be 8-20 chars, include upper, lower, number, and special char",
                  },
                })}
                error={errors.newPassword?.message}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-0 top-7"
              >
                <EyeIcon open={showNew} />
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter new password"
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  validate: {
                    matchPattern: (value) =>
                      value === newPasswordVal || "Passwords do not match",
                  },
                })}
                error={errors.confirmPassword?.message}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-0 top-7"
              >
                <EyeIcon open={showConfirm} />
              </button>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Password..." : "Create Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
