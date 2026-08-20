import { type logOutResponse, type UserProfile } from "../utils/type/user";
import { useAppSelector } from "../utils/customHooks/reduxHook";
import { handleLogout } from "@/apis/logOutApi";
import { useMutation} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useTokenExpiredMethod } from "../utils/customHooks/useTokenExpiredMethod";
const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40">
    <defs>
      <linearGradient id="gradDM" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3ABEF9" />
        <stop offset="100%" stop-color="#7B2FF7" />
      </linearGradient>
    </defs>
    <path d="M10 10h14c8 0 14 6 14 14s-6 14-14 14H10V10z" fill="url(#gradDM)" />
    <path d="M30 10l8 14 8-14h8l-8 14 8 14h-8l-8-14-8 14h-8l8-14-8-14h8z" fill="url(#gradDM)" />
    <rect x="50" y="6" width="6" height="6" rx="1" fill="#3ABEF9" />
    <rect x="58" y="2" width="6" height="6" rx="1" fill="#7B2FF7" />
  </svg>
);
const Navbar = () => {
  const userData: UserProfile = useAppSelector((state) => state?.user);
  const navigate = useNavigate();
  const tokenExpiredMethod = useTokenExpiredMethod();

  // ref for the dropdown trigger

  const { mutate, isPending } = useMutation<logOutResponse, AxiosError>({
    mutationFn: handleLogout,
    onSuccess: (data) => {
      if (data.data.logOutStatus) {
        tokenExpiredMethod();
      }
    },
    onError: (error: AxiosError) => {
      console.error("error logout", error);
    },
  });

  const handleCredentialClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userData?.status) {
      navigate("/login");
    } else {
      mutate();
    }
  };
  return (
    <div className=" fixed navbar bg-base-100 shadow-sm z-10">
      <div className="flex-1">
        <button
          className=" flex items-center gap-2 text-xl"
          onClick={() => navigate("/")}
        >
          <span className="flex h-15 w-15 shrink-0 items-center justify-center">
            <img className="h-full w-full object-contain" src="/favicon.svg" alt="DevMeet" />
          </span>
          <span>DevMeet</span>
        </button>
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
                alt="Profile"
                src={
                  userData?.data?.profilePic ||
                  import.meta.env.VITE_BASE_IMG_URL
                }
              />
            </div>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {userData?.status && (
              <>
                <li>
                  <button onClick={() => navigate("/profile")}>Profile</button>
                </li>
                <li>
                  <button onClick={() => navigate("/reset_password")}>
                    Reset password
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/feeds")}>User Feeds</button>
                </li>
                <li>
                  <button onClick={() => navigate("/pending-request")}>
                    My request
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/user-connections")}>
                    My Connections
                  </button>
                </li>
              </>
            )}
            <li>
              <button onClick={handleCredentialClick} disabled={isPending}>
                {userData?.status ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
