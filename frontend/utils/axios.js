import axios from "axios";
import { clearStore } from "../src/state_manager/user/userSlice";
import { getUserFromLocalStorage } from "./localStorage";

const customAxios = axios.create({
  baseURL: "http://localhost:5000",
});

customAxios.interceptors.request.use(async (config) => {
  const userData = await getUserFromLocalStorage();
  if (userData) config.headers["Authorization"] = `Bearer ${userData.token}`;
  return config;
});

export default customAxios;

// export async function apiRequest(url, method = "get", data = null) {
//   try {
//     let response;
//     switch (method) {
//       case "post":
//         response = await customAxios.post(url, data);
//         break;
//       case "put":
//         response = await customAios.put(`${url}/:id`, data);
//         break;
//       default:
//         response = await customAxios.get(url);
//     }
//     return response.data;
//   } catch (error) {
//     console.log("API ERROR");
//     // If the request is unauthorized, logout the user and redirect to login page
//     if (
//       error.response.status === 401 ||
//       error.toJSON().message === "Network Error"
//     ) {
//       clearStore();
//       window.location.href = "/login";
//     } else {
//       throw error;
//     }
//   }
// }
