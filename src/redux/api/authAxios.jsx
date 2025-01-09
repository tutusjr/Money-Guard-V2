import axios from "axios";

const baseURL = "https://wallet.b.goit.study";

export const costumAxiosInstance = axios.create({
  baseURL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export const setAxios = (token) => {
  if (token) {
    costumAxiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  } else {
    delete costumAxiosInstance.defaults.headers.common["Authorization"];
  }
};
