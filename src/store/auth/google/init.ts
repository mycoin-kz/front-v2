import { decodeJwt } from "jose";

export const setup = () => {
  // @ts-ignore
  window.handleGoogleAuth = (res: any) => {
    console.log("this is res from google auth", res);
    console.log(decodeJwt(res.credential));
    navigator.clipboard.writeText(res.credential);
  };

  const google_api = document.createElement("script");
  google_api.setAttribute("src", "https://apis.google.com/js/api.js");

  const google_login = document.createElement("script");
  google_login.setAttribute("src", "https://accounts.google.com/gsi/client");

  document.head.appendChild(google_api);
  document.head.appendChild(google_login);
};
