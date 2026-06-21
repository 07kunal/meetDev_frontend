import { getCookieToken } from "@/components/utils/customHooks/getCookieToken";

const UserFeed = () => {
  const name = getCookieToken();
  console.log('nameof cookie',name);
  return (
    <div>userFeed</div>
  )
};

export default UserFeed;
