import type { Collection, userFeeds } from "../utils/type/usersFeeds";

interface propsType {
  data: Collection<userFeeds>;
}
const UserCard = ({ data }: propsType) => {
  console.log("data in card", data);
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        {/* {data?.map((item: userFeeds) => (
          console.log('item',item?.fullName), */}
        <div
          className="card card-side bg-base-00 shadow-xl w-100 h-100"
          key={data[0]?._id}
        >
          <figure className="w-80">
            <img src={`${data[0]?.profilePic}`} alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{data[0]?.fullName}</h2>
            <span>Introduction</span>
            <span>Age: {data[0]?.age}</span>
            <span>Gender: {data[0]?.gender.toUpperCase()}</span>
            <p className="m-0">
              Skills:
              {data[0]?.skills.map((item: string) => (
                <span key={item} className="badge badge-ghost">{item}</span>
              ))}
            </p>
            <div className="card-actions justify-center align-center flex-nowrap">
              <button className="btn btn-primary">Ignore</button>
              <button className="btn btn-secondary">Interested</button>
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
