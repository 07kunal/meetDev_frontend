import { type logOutResponse, type UserProfile } from "../utils/type/user";
import { useAppSelector } from "../utils/customHooks/reduxHook";
import { handleLogout } from "@/apis/logOutApi";
import { useMutation} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useTokenExpiredMethod } from "../utils/customHooks/useTokenExpiredMethod";

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
            <img className="h-full w-full object-contain" src="/favicon.svg" alt="MeetDev" />
          </span>
          <span>MeetDev</span>
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
