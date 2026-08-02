import { fetchLoggedInUserConnectionApi } from "@/apis/userConnection/fetchLoggedInUserConnectionsApi";
import AccordionUserConnections from "@/components/AccordionUsersConnection/AccordionUserConnections";
import { useAppDispatch } from "@/components/utils/customHooks/reduxHook";
import type { loggedInUserConnectionDataType } from "@/components/utils/type/userConnection";
import { useEffect, useState } from "react";
import type { params } from "@/components/utils/type/commonType";
import { useQuery } from "@tanstack/react-query";
import { setUserConnections } from "@/components/utils/slices/loggedInUserConnectionSlice";

const LoggedInUserConnections = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const queryOptions: params = {
    page: 0,
    limit: 10,
  };
  const { data, isError, error } = useQuery<loggedInUserConnectionDataType>({
    queryKey: ["usesConnections"],
    queryFn: async (): Promise<loggedInUserConnectionDataType> => {
      const result = await fetchLoggedInUserConnectionApi(queryOptions);
      return result;
    },
  });
  useEffect(() => {
    if (data) {
      dispatch(setUserConnections(data));
    }
  }, [data]);
  useEffect(() => {
    if (isError) {
      const axiosError = error as any;
      if (axiosError?.response?.status === 401) {
        console.log("error");
      }
    }
  }, [error]);
  console.log("data=========userconnections", data);
  return (
    <div className="flex justify-center items-center flex-col w-full">
      <h1 className="text-center text-2xl p-1 mb-1">My connections</h1>
        
      {data?.data?.map((connectionItem) => (
        <AccordionUserConnections
          data={connectionItem}
          key={connectionItem?.requestId}
          openId={openId}
          setOpenId={setOpenId}
        />
      ))}
    </div>
  );
};

export default LoggedInUserConnections;
