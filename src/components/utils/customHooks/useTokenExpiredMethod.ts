import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../customHooks/reduxHook";
import { clearUser } from "../slices/userSliceReducer";
import { clearUserFeeds } from "../slices/userFeedSliceReducer";
import { clearUserConnections } from "../slices/loggedInUserConnectionSlice";
import { useQueryClient } from "@tanstack/react-query";
import { clearUserPendingReques } from "../slices/userPendingRequestSlice";
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
    queryClient.removeQueries({ queryKey: ["Profile"], exact: true });
    queryClient.removeQueries({ queryKey: ["usesPendingRequest"], exact: false });
    queryClient.removeQueries({ queryKey: ["usesConnections"], exact: false });
    Cookies.remove("token");
    navigate("/login");
  };
};
