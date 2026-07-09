import type { Collection, userFeeds } from "../utils/type/usersFeeds";

interface FeedsProps {
  data: Collection<userFeeds>;
  action: "feeds";
}

interface UserCardViewProps {
  data: userFeeds;
  action: "userCardView";
}

type propsType = FeedsProps | UserCardViewProps;
const UserCard = ({ data, action }: propsType) => {
  console.log('action',action);
  const userCardData = action === "feeds" ? data[0] : data;
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="card card-side bg-base-00 shadow-xl w-100 h-100"
          key={userCardData?._id}
        >
          <figure className="w-80">
            <img src={`${userCardData?.profilePic}`} alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {`${userCardData.firstName}`} {`${userCardData?.lastName}`}
            </h2>
            <span>Introduction</span>
            <span>Age: {userCardData?.age}</span>
            <span>Gender: {userCardData?.gender?.toUpperCase()}</span>
            <p className="m-0">
              Skills:
              {userCardData?.skills?.map((item: string) => (
                <span key={item} className="badge badge-ghost">
                  {item}
                </span>
              ))}
            </p>
            <div className="card-actions justify-center align-center flex-nowrap">
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
        {/* ))} */}
      </div>
      ;
    </>
  );
};

export default UserCard;
