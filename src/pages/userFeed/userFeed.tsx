import { useGetCookie } from '@/components/utils/customHooks/useGetCookie';

const UserFeed = () => {
  const name = useGetCookie();
  console.log('nameof cookie',name);
  return (
    <div>userFeed</div>
  )
};

export default UserFeed;
