import { type logOutResponse, type LoginResponse } from "../utils/type/user";
import { useAppSelector } from "../utils/customHooks/reduxHook";
import { handleLogout } from "@/apis/logOutApi";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const Navbar = () => {
  const userData: LoginResponse = useAppSelector((state) => state?.user);
  const { mutate, isPending } = useMutation<logOutResponse, AxiosError>({
    mutationFn: handleLogout,
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error: AxiosError) => {
      console.log("error logout", error);
    },
  });
  const handleLogOutClick = () => {
    mutate();
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevMeet</a>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end mx-10">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={userData?.data?.profilePic || import.meta.env.VITE_BASE_IMG_URL}
              />
            </div>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={handleLogOutClick}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
