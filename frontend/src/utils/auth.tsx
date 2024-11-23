import { IAuthParams, ILogoutParams } from "./types";

export const setUserToken = ({setToken}: IAuthParams) => {
  const userAuthToken = window.localStorage.getItem('user-auth-token');
  if (userAuthToken) {
    setToken(userAuthToken);
  }
}

export const logout = ({ setToken, client}: ILogoutParams) => {
  setToken('');
  localStorage.clear();
  client.resetStore();
};
