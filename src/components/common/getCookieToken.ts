import getCheckValidityToken from "./getCheckValidityToken";

export const getCookie = (name: string): string => {
  const value = `${document.cookie}`;
  const parts = value.split(`${name}=`);
  return parts[1];
};

export const getCookieToken = <T>() => {
  // <T,> it tell it uses as generic not tsx component file .
  let isUserLoggedIn: boolean = false;
  const isTokenValid = getCheckValidityToken();
  console.log('isTokenValid===========Test1',isTokenValid);
  if (isTokenValid) {
    isUserLoggedIn = true;
  } else {
    isUserLoggedIn = false;
  }
  return isUserLoggedIn as T;
};
/*
Telling that <T,> Adding a comma tells TypeScript that this is a type parameter, not an HTML tag.

*/
