export const getCookie = (name: string): string => {
  const value = `${document.cookie}`;
  const parts = value.split(`${name}=`);
  return parts[1];
};

export const getCookieToken = <T>() => {
  // <T,> it tell it uses as generic not tsx component file .
  let isUserLoggedIn: boolean = false;
  let token: string = getCookie("token");
  if (token) {
    isUserLoggedIn = true;
  } else {
    isUserLoggedIn = false;
  }
  return isUserLoggedIn as T;
};
