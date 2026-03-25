import React from "react";

const LoginForm = () => {
  return (
    <div className="flex justify-center align-super">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Login form</h2>
          <div className="flex-col justify-between align-super">
            <input type="text" placeholder="Small" className="input input-sm my-1" />
            <input
              type="password"
              placeholder="Small"
              className="input input-sm my-1"
            />
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
