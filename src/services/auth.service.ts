import axios from "axios";
import { BASE_URL } from "../constant";

// export function login(data, callback) {
//   axios.post("https://fakestoreapi.com/auth/login", data).then((response) => {
//     callback(true, response.data.token);
//   }).catch((error) => {
//     callback(false, error)
//     console.log(error)
//   });
// }

type LoginData = {
  username: string;
  password: string;
};

export async function login(data: LoginData) {
  const res = await axios.post(`${BASE_URL}/auth/login`, data);
  return res.data;
}