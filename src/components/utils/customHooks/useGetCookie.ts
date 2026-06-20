export const useGetCookie = <T,>()=> {
  let isUserLoggedIn : boolean= false;
  const getCookie = (name: string): string => {
    const value = `${document.cookie}`;
    const parts = value.split(`${name}=`);
    return parts[1];
  };
  let token: string = getCookie("token");
  if (token) {
    isUserLoggedIn = true;
  } else {
    isUserLoggedIn = false;
  }
  return isUserLoggedIn as T;
};
/*
Telling that <T,> Adding a comma tells TypeScript that this is a type parameter, not an HTML tag.

*/