import { type logOutResponse, type UserProfile } from "../utils/type/user";
import { useAppDispatch, useAppSelector } from "../utils/customHooks/reduxHook";
import { handleLogout } from "@/apis/logOutApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../utils/slices/userSliceReducer";
import { clearUserFeeds } from "../utils/slices/userFeedSliceReducer";
import { clearUserPendingReques } from "../utils/slices/userPendingRequestSlice";

const Navbar = () => {
  const userData: UserProfile = useAppSelector((state) => state?.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  // ref for the dropdown trigger

  const { mutate, isPending } = useMutation<logOutResponse, AxiosError>({
    mutationFn: handleLogout,
    onSuccess: (data) => {
      if (data.data.logOutStatus) {
        dispatch(clearUser());
        dispatch(clearUserFeeds());
        dispatch(clearUserPendingReques());
        queryClient.removeQueries({
          queryKey: ["Profile","usesPendingRequest"],
        });
        navigate("/");
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
    <div className=" static navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <button className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
          DevMeet
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
                  <button onClick={() => navigate("/pending-request")}>My request</button>
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
