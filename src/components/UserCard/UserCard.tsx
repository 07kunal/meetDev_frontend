import type { Collection, userFeeds } from "../utils/type/usersFeeds";
import type { User } from "../utils/type/user";
interface FeedsProps {
  data: Collection<userFeeds>;
  action: "feeds";
}

interface UserCardViewProps {
  data: User;
  action: "userCardView";
}

type propsType = FeedsProps | UserCardViewProps;
const UserCard = ({ data, action }: propsType) => {
  console.log("action", action);
  const userCardData = action === "feeds" ? data[0] : data;
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="card card-side bg-base-200 shadow-xl w-[600px] h-100"
          key={userCardData?._id}
        >
          {/* Fixed width for image section */}
          <div className="w-55 flex-shrink-0">
            <figure className="w-full h-full">
              <img
                src={`${userCardData?.profilePic}`}
                alt="Profile"
                className="object-cover w-full h-full rounded-l-lg"
              />
            </figure>
          </div>

          {/* Fixed width for card body */}
          <div className="card-body w-[350px]">
            <h2 className="card-title">
              {userCardData.firstName} {userCardData?.lastName}
            </h2>
            <span>Introduction</span>
            <span>Age: {userCardData?.age}</span>
            <span>Gender: {userCardData?.gender?.toUpperCase()}</span>

            {userCardData?.address && (
              <span>Address: {userCardData?.address || "-"}</span>
            )}

            <span className="m-0 grow-0">
              Skills:
              <div className="max-h-12 overflow-y-auto inline-block">
                {userCardData?.skills?.map((item: string) => (
                  <span key={item} className="badge badge-ghost">
                    {item}
                  </span>
                ))}
              </div>
            </span>

            <span className="m-0 grow-5">
              Education:
              <div className="max-h-12 overflow-y-auto inline-block">
                {userCardData?.education?.map((item: string) => (
                  <span key={item} className="badge badge-ghost">
                    {item || "-"}
                  </span>
                ))}
              </div>
            </span>

            <div className="card-actions justify-end align-end flex-nowrap">
              <button disabled={action !== "feeds"} className="btn btn-primary">
                Ignore
              </button>
              <button
                disabled={action !== "feeds"}
                className="btn btn-secondary"
              >
                Interested
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
