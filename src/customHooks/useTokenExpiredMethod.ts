import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./reduxHook";
import { clearUser } from "../utils/slices/userSliceReducer";
import { clearUserFeeds } from "../utils/slices/userFeedSliceReducer";
import { clearUserConnections } from "../utils/slices/loggedInUserConnectionSlice";
import { useQueryClient } from "@tanstack/react-query";
import { clearUserPendingReques } from "../utils/slices/userPendingRequestSlice";
import Cookies from "js-cookie";
type TokenExpiredHandler = () => void;
export const useTokenExpiredMethod = (): TokenExpiredHandler => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return () => {
    dispatch(clearUser());
    dispatch(clearUserFeeds());
    dispatch(clearUserPendingReques());
    dispatch(clearUserConnections());
    queryClient.removeQueries({ queryKey: ["Profile"], exact: false });
    queryClient.removeQueries({ queryKey: ["usesPendingRequest"], exact: false });
    queryClient.removeQueries({ queryKey: ["usesConnections"], exact: false });
    Cookies.remove("token");
    navigate("/login");
  };
};
