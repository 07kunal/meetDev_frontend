import type { Collection, userFeeds } from "../utils/type/usersFeeds";
import type { User } from "../utils/type/user";
import type { connectionRequestProps } from "../utils/type/commonType";
import { useQueryClient } from "@tanstack/react-query";
interface FeedsProps {
  data: Collection<userFeeds> | undefined;
  action: "feeds";
  handleConnectionRequest: ({
    status,
    connectionRequestId,
  }: connectionRequestProps) => void;
}

interface UserCardViewProps {
  data: User;
  action: "userCardView";
}

type propsType = FeedsProps | UserCardViewProps;
const UserCard = (props: propsType) => {
  const { data, action } = props;
  const queryClient = useQueryClient();

  const userCardData = action === "feeds" ? data && data[0] : data;
  return (
    <div className="flex items-center justify-center flex-col gap-4">
      {action === "feeds" && (
        <div className="text-right w-full max-w-[600px]">
          <button
            className="btn btn-secondary"
            onClick={() =>
              queryClient.refetchQueries({ queryKey: ["userFeeds"] })
            }
          >
            Refresh
          </button>
        </div>
      )}

      <div className="card card-side bg-base-200 shadow-xl w-full max-w-[600px] overflow-hidden">
        <div className="w-40 min-w-[160px] md:w-48 md:min-w-[180px] bg-base-300">
          <figure className="h-full w-full">
            <img
              src={userCardData?.profilePic ?? ""}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </figure>
        </div>

        <div className="card-body px-5 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h2 className="card-title text-lg md:text-xl">
                {userCardData?.firstName} {userCardData?.lastName}
              </h2>
              <span className="text-sm text-base-content/70">
                {userCardData?.gender?.toUpperCase() || "-"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-base-content/80">
              <div>
                <div className="font-semibold">About</div>
                <div className="max-h-20 overflow-auto whitespace-normal break-words">
                  {userCardData?.about || "-"}
                </div>
              </div>
              <div>
                <div className="font-semibold text-center ">Age</div>
                <div className=" text-center ">{userCardData?.age ?? "-"}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="font-semibold">Address</div>
                <div className="max-h-20 overflow-auto whitespace-normal break-words">
                  {userCardData?.address || "-"}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="font-semibold">Skills</div>
                <div className="flex flex-wrap gap-2 mt-2 max-h-20 overflow-auto">
                  {userCardData?.skills?.length ? (
                    userCardData.skills.map((item: string) => (
                      <span key={item} className="badge badge-ghost">
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-base-content/60">-</span>
                  )}
                </div>
              </div>

              <div>
                <div className="font-semibold">Education</div>
                <div className="flex flex-wrap gap-2 mt-2 max-h-20 overflow-auto">
                  {userCardData?.education?.length ? (
                    userCardData.education.map((item: string) => (
                      <span key={item} className="badge badge-ghost">
                        {item || "-"}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-base-content/60">-</span>
                  )}
                </div>
              </div>
            </div>

            {action === "feeds" && (
              <div className="card-actions justify-end flex-wrap gap-3 pt-2">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    (props as FeedsProps).handleConnectionRequest({
                      status: "ignored",
                      connectionRequestId: userCardData?.id ?? "",
                    })
                  }
                >
                  Ignore
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    (props as FeedsProps).handleConnectionRequest({
                      status: "interested",
                      connectionRequestId: userCardData?.id ?? "",
                    })
                  }
                >
                  Interested
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
