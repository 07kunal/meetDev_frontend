import AccordionPendingRequest from "@/components/AccordionPendingRequest/AccordionPendingRequest";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { params } from "@/components/utils/type/commonType";
import { useAppDispatch } from "@/components/utils/customHooks/reduxHook";
import type { userPendingRequest } from "@/components/utils/type/userConnection";
import { fetchMyIncommingPendingRequestApi } from "@/apis/userConnection/fetchMyIncommingPendingRequest";
import { setUserPendingRequest } from "@/components/utils/slices/userPendingRequestSlice";


const UserIncommimgPendingRequest = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const queryOptions: params = {
    page: 0,
    limit: 10,
  };
  const { data, isError, error } = useQuery<userPendingRequest>({
    queryKey: ["usesPendingRequest"],
    queryFn: async (): Promise<userPendingRequest> => {
      const result = await fetchMyIncommingPendingRequestApi(queryOptions);
      return result;
    }
  });
  useEffect(() => {
    if (data) {
    dispatch(setUserPendingRequest(data));
    }
  }, [data]);
  useEffect(() => {
    if (isError) {
      const axiosError = error as any;
      if (axiosError?.response?.status === 401) {
       console.log('error');
      }
    }
  }, [error]);
  console.log('data=========',data?.data);

  return (
    <div className="flex justify-center items-center flex-col w-full">
      <h1 className="text-center text-2xl p-1 mb-1">My Pending Requests</h1>

      {data?.data?.map((connectionItem) => (
        <AccordionPendingRequest
          data={connectionItem}
          key={connectionItem?._id}
          openId={openId}
          setOpenId={setOpenId}
        />
      ))}
    </div>
  );
};

export default UserIncommimgPendingRequest;
