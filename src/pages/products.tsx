// import { useState } from "react";
import { useImmer } from "use-immer";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import Cart from "../components/Cart";
import { getProducts, ProductType } from "../services/product.service";
import { useLogin } from "../hooks/useLogin";
import useTotalPrice from "../hooks/use-total-price";

export type CartType = {
  id: number;
  title: string;
  quantity: number;
};

// const products: ProductType[] = [
//   {
//     id: 1,
//     name: "Sepatu Bagus",
//     price: 100000,
//     imageUrl: "/images/fashion-shoes-sneakers.jpg",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,recusandae rerum impedit explicabo dolores in perspiciatis ipsum quod doloribus quisquam Provident earum enim dolor maxime quae, nobis dicta numquam voluptatum",
//   },
//   {
//     id: 2,
//     name: "Sepatu Keren",
//     price: 10000000,
//     imageUrl: "/images/fashion-shoes-sneakers.jpg",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//   },
//   {
//     id: 3,
//     name: "Sepatu Mantap",
//     price: 1000000,
//     imageUrl: "/images/fashion-shoes-sneakers.jpg",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit.  in perspiciatis ipsum quod doloribus quisquam Provident earum enim dolor maxime quae, nobis dicta numquam voluptatum",
//   },
// ];

export default function ProductsPage() {
  const [cart, updateCart] = useImmer<CartType[]>([]);
  // const [totalPrice, setTotalPrice] = useState(0);
  const [isSync, setIsSync] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  // const dispatch = useTotalPriceDispatch();
  // const { total } = useTotalPrice();

  const { totalPrice, onUpdateTotalPrice } = useTotalPrice();

  useLogin();

  // get product from api
  useEffect(() => {
    async function exec() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error: any) {
        alert(error.message);
        setProducts([]);
      }
    }
    exec();

    // getProducts((data) => {
    //   setProducts(data);
    // });
  }, []);

  // sync cart with local storage
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

  // update total price
  useEffect(() => {
    const sum = cart.reduce((prev, item) => {
      const product = products.find((product) => product.id === item.id);
      if (product) {
        return prev + product.price * item.quantity;
      } else {
        return prev;
      }
    }, 0);

    // setTotalPrice(sum);

    // dispatch({
    //   type: "UPDATE_TOTAL_PRICE",
    //   payload: {
    //     total: sum,
    //   },
    // });

    onUpdateTotalPrice(sum);

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, products, onUpdateTotalPrice]);

  function handleAddToCart(product: ProductType) {
    updateCart((draft) => {
      const currentItem = draft.find((item) => item.id === product.id);
      if (currentItem) {
        currentItem.quantity += 1;
      } else {
        draft.push({ id: product.id, title: product.title, quantity: 1 });
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

  return (
    <>
      <Navbar />
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
