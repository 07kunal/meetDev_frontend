import AccordionPendingRequest from "@/components/AccordionPendingRequest/AccordionPendingRequest";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { params } from "@/components/utils/type/commonType";
import { useAppDispatch } from "@/components/utils/customHooks/reduxHook";
import type { userPendingRequest } from "@/components/utils/type/userConnection";
import { fetchMyIncommingPendingRequestApi } from "@/apis/userConnection/fetchMyIncommingPendingRequest";

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
  // useEffect(() => {
  //   if (data) {
  //    console.log('connections-data',data);
  //   }
  // }, []);
  // useEffect(() => {
  //   if (isError) {
  //     const axiosError = error as any;
  //     if (axiosError?.response?.status === 401) {
  //      console.log('error');
  //     }
  //   }
  // }, []);
  console.log('data=========',data?.data);

  return (
    <div className="flex justify-center items-center flex-col w-full">
      {data?.data?.map((dummyItem) => (
        <AccordionPendingRequest
          data={dummyItem}
          key={dummyItem?._id}
          openId={openId}
          setOpenId={setOpenId}
        />
      ))}
    </div>
  );
};

export default UserIncommimgPendingRequest;
