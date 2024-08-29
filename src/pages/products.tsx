// import { useState } from "react";
import { useImmer } from "use-immer";
import Button from "../components/Button";
import Card, { CardFooter, CardHeader, CardBody } from "../components/Card";
import { useEffect, useState } from "react";

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
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      const product = products.find((product) => product.id === item.id);
      if (product) {
        return acc + product.price * item.quantity;
      } else {
        return acc;
      }
    }, 0);
    setTotalPrice(sum);
  }, [cart]);

  function handleAddToCart(product: Product) {
    updateCart((draft) => {
      const currentItem = draft.find((item) => item.id === product.id);
      if (currentItem) {
        currentItem.quantity += 1;
      } else {
        draft.push({ id: product.id, name: product.name, quantity: 1 });
      }
    });
  }

  function handleIncreaseQuantity(cart: Cart) {
    updateCart((draft) => {
      const currentItem = draft.find((item) => item.id === cart.id);
      if (currentItem) {
        currentItem.quantity += 1;
      }
    });
  }

  function handleDecreaseQuantity(cart: Cart) {
    updateCart((draft) => {
      const currentItem = draft.find((item) => item.id === cart.id);
      if (currentItem && currentItem.quantity > 1) {
        currentItem.quantity -= 1;
      } else {
        draft.splice(draft.indexOf(cart), 1);
      }
    });
  }

  function handleRemoveFromCart(cart: Cart) {
    updateCart((draft) => {
      draft.splice(draft.indexOf(cart), 1);
    });
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
        <div className="flex flex-wrap w-4/6">
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
        <div className="w-2/6 pr-4">
          <h1 className="text-3xl font-bold my-4 text-blue-700">Cart</h1>
          <ul className="mb-2">
            {cart.length === 0 && <p>Cart is empty</p>}
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center mb-4 border rounded-md border-gray-600 shadow p-4"
              >
                <span className="grow">
                  {item.name} - {item.quantity} pc(s)
                </span>
                <Button
                  variant="bg-gray-500 ml-2"
                  onClick={() => handleIncreaseQuantity(item)}
                >
                  +
                </Button>
                <Button
                  variant="bg-gray-500 ml-2"
                  onClick={() => handleDecreaseQuantity(item)}
                >
                  -
                </Button>
                <Button
                  variant="bg-red-600 ml-2"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <b>Total:</b>
            <b>
              {totalPrice.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </b>
          </div>
        </div>
      </div>
    </>
  );
}
