"use client";

import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const schema = z.object({
  oldPassword: z
    .string()
    .min(8, { message: "Password must be minimum 8 charaters" })
    .max(15, { message: "Password must not be more than 15 characters" }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be minimum 8 charaters" })
    .max(15, { message: "Password must not be more than 15 characters" }),
  reEnterPassword: z
    .string()
    .min(8, { message: "Password must be minimum 8 charaters" })
    .max(15, { message: "Password must not be more than 15 characters" }),
});

type FormData = z.infer<typeof schema>;

const ChangePassword = () => {
  const { status, data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [msg, setMsg] = useState("");
  const [registerStatus, setRegisterStatus] = useState(false);

  const onSubmit = async (formData: FieldValues) => {
    const email = session!.user!.email;

    const response = await fetch("/api/changepassword", {
      method: "POST",
      body: JSON.stringify({ ...formData, email }),
    });

    const res = await response.json();
    if (response.ok) {
      reset();
      setMsg(`Password changed successfully for ${res.email}`);
      setRegisterStatus(true);
      setTimeout(() => {
        alert("Logging out for security reasons!");
        signOut({
          callbackUrl: "/dashboard",
        });
      }, 5000);
    } else {
      setMsg(res.error);
      setRegisterStatus(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {msg &&
          (registerStatus ? (
            <p className="block text-green-600 text-sm font-bold mb-1">{msg}</p>
          ) : (
            <p className="block text-red-600 text-sm font-bold mb-1">{msg}</p>
          ))}
        <div className="mb-3">
          <label
            htmlFor="oldPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Old Password
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="oldPassword"
            {...register("oldPassword")}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-xs italic">
              {errors.oldPassword.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="newPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="newPassword"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs italic">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="reEnterPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Re-Enter Password
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reEnterPassword"
            {...register("reEnterPassword")}
          />
          {errors.reEnterPassword && (
            <p className="text-red-500 text-xs italic">
              {errors.reEnterPassword.message}
            </p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
