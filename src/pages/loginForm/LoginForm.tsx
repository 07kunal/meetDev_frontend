import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import loginApi from "@/apis/loginApi";
import { AxiosError } from "axios";
import type { LoginBody, UserProfile } from "@/components/utils/type/user";
import { setUser } from "@/components/utils/slices/userSliceReducer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/components/utils/customHooks/reduxHook";

const LoginForm = () => {
  const [loginCredential, setLoginCredential] = useState<LoginBody>({
    emailId: "Dev104@gmail.com",
    password: "testA@321",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginCredential = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCredential((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Mutation
  const { mutate, isPending } = useMutation<
    UserProfile,
    AxiosError,
    LoginBody
  >({
    mutationFn: loginApi,

    onSuccess: (data) => {
      dispatch(setUser(data));
      if(data?.data){
        navigate('/feeds');
        console.log('TEST-------------3');
      }

    },

    onError: (error: AxiosError) => {
      console.error("Message:", error);
    },
  });

  // Submit handler
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginCredential?.emailId || !loginCredential?.password) return;

    mutate(loginCredential);
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
                type="emailId"
                placeholder="Enter your emailId"
                className="input input-bordered"
                value={loginCredential.emailId}
                onChange={handleLoginCredential}
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
                value={loginCredential.password}
                onChange={handleLoginCredential}
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
