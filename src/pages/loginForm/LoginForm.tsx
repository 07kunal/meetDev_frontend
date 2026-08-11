import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import loginApi from "@/apis/loginApi";
import { AxiosError } from "axios";
import type { LoginBody, UserProfile } from "@/components/utils/type/user";
import { setUser } from "@/components/utils/slices/userSliceReducer";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/components/utils/customHooks/reduxHook";
import type { ErrorResponse } from "@/components/utils/type/commonType";

const LoginForm = () => {
  const [loginCredential, setLoginCredential] = useState<LoginBody>({
    emailId: "rajkumar102@gmail.com",
    password: "testA@321",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginCredential = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoginCredential((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Mutation
  const { mutate, isPending } = useMutation<
    UserProfile,
    AxiosError<ErrorResponse>,
    LoginBody
  >({
    mutationFn: loginApi,

    onSuccess: (data) => {
      dispatch(setUser(data));
      if (data?.data) {
        navigate("/feeds");
      }
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      if (!error.response?.data?.status) {
        setErrorMessage(error.response?.data?.message);
      } else {
        setErrorMessage(null);
      }
      console.error("Message:", error.response?.data?.message);
    },
  });

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);
  // Submit handler
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginCredential?.emailId || !loginCredential?.password) return;

    mutate(loginCredential);
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            {errorMessage && (
              <p className="text-error text-sm text-center">{errorMessage}</p>
            )}

            <h2 className="text-2xl font-bold text-center">Login</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>

                <input
                  type="emailId"
                  name="emailId"
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
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  value={loginCredential.password}
                  onChange={handleLoginCredential}
                  required
                />
              </div>

              {/* Button */}
              <div className="form-control mt-4 ">
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
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
