import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import _axios from "axios";

export const base_url = import.meta.env.DEV
  ? "https://127.0.0.1:8000/api/"
  : "https://back-app-2y9c7.ondigitalocean.app/api/";

const jar = new CookieJar();
export const api = wrapper(
  _axios.create({
    withCredentials: true,
    xsrfHeaderName: "X-CSRFToken",
    baseURL: base_url,
    jar,
  })
);
export const API_REGISTER = base_url + "auth/register";
export const API_LOGIN = base_url + "auth/login/";
export const API_LOGOUT = base_url + "auth/logout/";

export const API_FACEBOOK_LOGIN = base_url + "auth/facebook/";
export const API_GOOGLE_LOGIN_FETCH_TOKEN = base_url + "auth/google/";
export const API_GOOGLE_LOGIN = base_url + "auth/google-code/";

export const GOOGLE_CLIENT_ID =
  "791604705325-uukmdg4rat6miu3gimmk0ct5ohv8sd1f.apps.googleusercontent.com";
export const GOOGLE_REDIRECT_URI = base_url + "auth/google/";
export const GOOGLE_SCOPES = encodeURI(
  "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid"
);
export const googleLoginLink = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=${GOOGLE_SCOPES}`;
