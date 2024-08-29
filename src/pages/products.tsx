// import { useState } from "react";
import { useImmer } from "use-immer";
import Button from "../components/Button";
import Card, { CardFooter, CardHeader, CardBody } from "../components/Card";

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};

type Cart = {
  id: number;
  name: string;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Sepatu Bagus",
    price: 100000,
    imageUrl: "/images/fashion-shoes-sneakers.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,recusandae rerum impedit explicabo dolores in perspiciatis ipsum quod doloribus quisquam Provident earum enim dolor maxime quae, nobis dicta numquam voluptatum",
  },
  {
    id: 2,
    name: "Sepatu Keren",
    price: 10000000,
    imageUrl: "/images/fashion-shoes-sneakers.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 3,
    name: "Sepatu Mantap",
    price: 1000000,
    imageUrl: "/images/fashion-shoes-sneakers.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.  in perspiciatis ipsum quod doloribus quisquam Provident earum enim dolor maxime quae, nobis dicta numquam voluptatum",
  },
];

export default function ProductsPage() {
  const [cart, updateCart] = useImmer<Cart[]>([]);

  function handleAddToCart(product: Product) {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      updateCart((draft) => {
        draft[cart.indexOf(existingProduct)].quantity += 1;
      });
    } else {
      updateCart((draft) => {
        draft.push({ id: product.id, name: product.name, quantity: 1 });
      });
    }
  }

  function handleClickLogout(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.href = "/login";
  }

  return (
    <>
      <div className="h-10 bg-blue-600 text-end">
        <span className="text-sm font-semibold text-white">
          {localStorage.getItem("email")}
        </span>
        <Button onClick={handleClickLogout}>Logout</Button>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-wrap w-3/4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader imageUrl={product.imageUrl} />
              <CardBody title={product.name}>{product.description}</CardBody>
              <CardFooter
                price={product.price}
                addToCart={() => handleAddToCart(product)}
              />
            </Card>
          ))}
        </div>
        <div className="w-1/4">
          <h1 className="text-3xl font-bold my-4 text-blue-700">Cart</h1>
          <ul>
            {cart.length === 0 && <p>Cart is empty</p>}
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity} pc(s)
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
