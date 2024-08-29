// import { useState } from "react";
import { useImmer } from "use-immer";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import Cart from "../components/Cart";

export type ProductType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};

export type CartType = {
  id: number;
  name: string;
  quantity: number;
};

const products: ProductType[] = [
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
  const [cart, updateCart] = useImmer<CartType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSync, setIsSync] = useState(false);

  useEffect(() => {
    if (isSync) return;
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      updateCart((draft) => {
        draft.push(...JSON.parse(storedCart));
      });
    }
    setIsSync(true);
  }, []);

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

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function handleAddToCart(product: ProductType) {
    updateCart((draft) => {
      const currentItem = draft.find((item) => item.id === product.id);
      if (currentItem) {
        currentItem.quantity += 1;
      } else {
        draft.push({ id: product.id, name: product.name, quantity: 1 });
      }
    });
  }

  function handleIncreaseQuantity(cart: CartType) {
    updateCart((draft) => {
      const currentItem = draft.find((item) => item.id === cart.id);
      if (currentItem) {
        currentItem.quantity += 1;
      }
    });
  }

  function removeItem(draft: CartType[], cart: CartType) {
    const index = draft.findIndex((item) => item.id === cart.id);
    if (index !== -1) {
      draft.splice(index, 1);
    }
  }

  function handleDecreaseQuantity(cart: CartType) {
    updateCart((draft) => {
      const currentItem = draft.find((item) => item.id === cart.id);
      if (currentItem && currentItem.quantity > 1) {
        currentItem.quantity -= 1;
      } else {
        removeItem(draft, cart);
      }
    });
  }

  function handleRemoveFromCart(cart: CartType) {
    updateCart((draft) => {
      removeItem(draft, cart);
      // draft.splice(draft.indexOf(cart), 1);
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
      <Navbar handleClickLogout={(e) => handleClickLogout(e)} />
      <div className="flex justify-center">
        <Product products={products} handleAddToCart={handleAddToCart} />
        <Cart
          cart={cart}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          handleRemoveFromCart={handleRemoveFromCart}
          totalPrice={totalPrice}
        />
      </div>
    </>
  );
}
