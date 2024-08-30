import axios from "axios";
import { BASE_URL } from "../constant";

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

// export function getProducts(callback: (data: ProductType[]) => void) {
//   axios
//     .get("https://fakestoreapi.com/products")
//     .then((response) => callback(response.data as ProductType[]))
//     .catch((error) => console.log(error));
// }

export async function getProducts() {
  const data = await axios
    .get(`${BASE_URL}/products`)

  return data.data as ProductType[]
}
