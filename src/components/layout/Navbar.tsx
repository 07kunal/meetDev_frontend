import { type logOutResponse, type UserProfile } from "../utils/type/user";
import { useAppSelector } from "../utils/customHooks/reduxHook";
import { handleLogout } from "@/apis/logOutApi";
import { useMutation} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useTokenExpiredMethod } from "../utils/customHooks/useTokenExpiredMethod";
import {
  ArrowRightOnRectangleIcon,
  Bars3BottomLeftIcon,
  LinkIcon,
  LockClosedIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

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
    <div className="fixed navbar z-10 border-b border-base-200/70 bg-base-100/90 px-4 shadow-sm backdrop-blur-md sm:px-6">
      <div className="flex-1">
        <button
          className="flex items-center justify-center gap-2 text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
          onClick={() => navigate("/")}
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 p-1 ring-1 ring-primary/15 sm:h-14 sm:w-14">
            <img className="h-full w-full object-contain" src="/favicon.svg" alt="MeetDev" />
          </span>
          <span className="hidden sm:inline">MeetDev</span>
        </button>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            aria-label="Open account menu"
            className="btn btn-ghost btn-circle avatar ring-2 ring-transparent transition-all hover:ring-primary/30"
          >
            <div className="w-10 overflow-hidden rounded-full bg-primary/10">
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
            className="menu dropdown-content z-1 mt-3 w-72 rounded-2xl border border-base-200 bg-base-100 p-2 shadow-xl shadow-base-content/10"
          >
            {userData?.status && (
              <li className="pointer-events-none mb-1 border-b border-base-200 px-3 pb-3 pt-2">
                <div className="flex items-center gap-3 p-0">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">
                      {userData.data?.firstName} {userData.data?.lastName}
                    </p>
                  </div>
                </div>
              </li>
            )}
            {userData?.status && (
              <>
                <li>
                  <button className="gap-3 rounded-lg py-2.5" onClick={() => navigate("/profile")}>
                    <UserIcon className="h-4 w-4 text-primary" />
                    Profile
                  </button>
                </li>
                <li>
                  <button className="gap-3 rounded-lg py-2.5" onClick={() => navigate("/reset_password")}>
                    <LockClosedIcon className="h-4 w-4 text-primary" />
                    Reset password
                  </button>
                </li>
                <li>
                  <button className="gap-3 rounded-lg py-2.5" onClick={() => navigate("/feeds")}>
                    <Bars3BottomLeftIcon className="h-4 w-4 text-primary" />
                    User Feeds
                  </button>
                </li>
                <li>
                  <button className="gap-3 rounded-lg py-2.5" onClick={() => navigate("/pending-request")}>
                    <LinkIcon className="h-4 w-4 text-primary" />
                    My request
                  </button>
                </li>
                <li>
                  <button className="gap-3 rounded-lg py-2.5" onClick={() => navigate("/user-connections")}>
                    <UserGroupIcon className="h-4 w-4 text-primary" />
                    My Connections
                  </button>
                </li>
              </>
            )}
            <li className="mt-1 border-t border-base-200 pt-1">
              <button
                className={`gap-3 rounded-lg py-2.5 ${userData?.status ? "text-error hover:bg-error/10" : "text-primary hover:bg-primary/10"}`}
                onClick={handleCredentialClick}
                disabled={isPending}
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                {isPending ? "Logging out..." : userData?.status ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
