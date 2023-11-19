"use client";

import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be atleast 3 characters." })
    .regex(new RegExp("^[a-zA-Z]+$"), {
      message: "Name should contain only alphabets",
    }),
  email: z.string().email({ message: "Not a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be minimum 8 charaters" })
    .max(15, { message: "Password must not be more than 15 characters" }),
});

type FormData = z.infer<typeof schema>;

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [status, setStatus] = useState("");
  const [registerStatus, setRegisterStatus] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const res = await response.json();
    if (response.ok) {
      reset();
      setStatus(res.email);
      setRegisterStatus(true);
    } else {
      setStatus(res.error);
      setRegisterStatus(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {status &&
          (registerStatus ? (
            <p className="block text-green-600 text-sm font-bold mb-1">
              User registered Successfully with email: {status}
            </p>
          ) : (
            <p className="block text-red-600 text-sm font-bold mb-1">
              {status}
            </p>
          ))}
        <div className="mb-3">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {errors.password.message}
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
export default RegistrationForm;
