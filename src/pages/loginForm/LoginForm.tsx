import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import loginApi from "@/apis/loginApi";
import { AxiosError } from "axios";

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Input handlers
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };



  // Mutation
  const { mutate, isPending } = useMutation<
    LoginResponse,
    AxiosError,
    LoginBody
  >({
    mutationFn: loginApi,

    onSuccess: (data) => {
      console.log("Welcome back:", data);
    },

    onError: (error) => {
      console.error("Login failed:", error.response?.data || error.message);
    },
  });

  // Submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) return;

    mutate({
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                value={email}
                onChange={handleChangeEmail}
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={password}
                onChange={handleChangePassword}
                required
              />
            </div>

            {/* Button */}
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isPending}
              >
                {isPending ? "Loading..." : "Login"}
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-sm mt-2">
            Don’t have an account?{" "}
            <a href="#" className="link link-primary">
              Sign up
            </a>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default LoginForm;
