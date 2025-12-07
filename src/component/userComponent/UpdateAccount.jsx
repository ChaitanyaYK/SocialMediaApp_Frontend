import React, {  useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button, Logo } from "../index.js";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { updateAccount, updateAvatar, updateCoverImage } from "../../store/slices/authSlice.js";

const UpdateAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, isError, error } = useSelector((state) => state.auth);
    
    const {register, handleSubmit, formState: {errors}, watch, setValue} = useForm();

    const updateAcc = async (updateData) => {
        try { 
          const accountInfo = await dispatch(updateAccount({fullName: updateData.fullName, email: updateData.email}));

          if (updateAccount.fulfilled.match(accountInfo)) {
            toast.success("Account details updated", {autoClose: 2000});
          } else {
            toast.error(accountInfo.payload || "Failed to update account", {autoClose: 2500});
          }

          if (updateData.avatar?.[0]) {
            const formData = new FormData();
            formData.append("avatar", updateData.avatar[0]);
            const uploadAvatar = await dispatch(updateAvatar(formData));

            if (updateAvatar.fulfilled.match(uploadAvatar)) {
              toast.success("Avatar is updated", {autoClose: 2000});
            } else {
              toast.error(uploadAvatar.payload || "Failed to update Avatar Image", {autoClose: 2500});
            } 
          }

          if (updateData.coverImage?.[0]) {
            const formData = new FormData();
            formData.append("coverImage", updateData.coverImage[0]);
            const uploadCoverImage = await dispatch(updateCoverImage(formData));
            if (updateCoverImage.fulfilled.match(uploadCoverImage)) {
              toast.success("Cover Image is updated", {autoClose: 2000});
            } else {
              toast.error(uploadCoverImage.payload || "Failed to update Cover Image", {autoClose: 2500});
            }
          } 
          
        } catch (error) {
            console.error("Error while updating Account", error);
        }
        navigate('/');
    }

    const slugTransform = useCallback((value) => {
      if (value && typeof value === "string") {
        return value
          .trim()
          .toLowerCase()
          // .replace(/^[a-zA-Z\d\s]+/g, '-') // '^' this is negate_sign means ise mat match karana and in [] we write combination of pattern. a-z & A-Z this for alphabet & "\d" for degit & "\s" for spaces to yaha ye pattern chodh ke agar koi input aye to use '-' karado 
          .replace(/\s/g, '-');  // here we g is for global replace 'space' with "-"
      }
      return "";
    }, [])

    React.useEffect(() => {
      const subcription = watch((value, {}) => {
        if (value.fullName) {
          setValue("slug", slugTransform(value.fullName), {shouldValidate: true})
        }
      })

      return () => {
        subcription.unsubscribe();
      }
    }, [watch, setValue, slugTransform])

    const avatarFile = watch("avatar")?.[0];
    const coverFile = watch("coverImage")?.[0];

  return (
    <div className="flex items-center justify-center w-full">
      <div className={`mx-auto w-full max-w-lg bg-gray-700 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-start flex-col items-center">
            <span className="inline-block w-full max-w-[50px]">
              <Logo width="100%" />
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Update Account</h2>
        <form onSubmit={handleSubmit(updateAcc)}>
          <div className="space-5-y space-y-4">
          <Input
              label="Email"
              type="email"
              placeholder="Email"
              className=""
              
              {...register("email", {required: true})}
              error={errors.email?.message}
          />
          <Input
              label="Full Name"
              type="text"
              placeholder="Enter Full Name"
              className=""
              
              {...register("fullName", {required: true})}
              // onInput={(e) => {
              //     setValue("fullName", slugTransform(e.currentTarget.value), {shouldValidate: true});
              // } }
          />
          <Input
              label="Avatar"
              type="file"
              placeholder="Upload Avatar Image"
              className=""
              {...register("avatar", {required: true})}
          />
            { avatarFile &&
              (
                <img
                  src={URL.createObjectURL(avatarFile)}
                  alt="avatar preview"
                  className="rounded-lg mb-4 h-45 w-full"
                />
              )
            }
          <Input
              label="Cover Image"
              type="file"
              placeholder="Upload Cover Image"
              className=""
              {...register("coverImage", {required: true})}
          />
            { coverFile &&
              (
                <img
                  src={URL.createObjectURL(coverFile)}
                  alt="cover preview"
                  className="rounded-lg mb-4 h-45 w-full"
                />
              )
            }
          <Button type="submit" disabled={loading}>
              {loading? "Updating..." : "Update Account"}
          </Button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default UpdateAccount;


