import { useImmer } from "use-immer";
import { CartType } from "../pages/Products";
import { getProducts, ProductType } from "../services/product.service";
import React from "react";

export default function useCart() {
  const [cart, updateCart] = useImmer<CartType[]>([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [isSync, setIsSync] = React.useState(false);
  const [products, setProducts] = React.useState<ProductType[]>([]);

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (isSync) return;
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      updateCart((draft) => {
        draft.push(...JSON.parse(storedCart));
      });
    }
    setIsSync(true);
  }, []);

  React.useEffect(() => {
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
  }, [cart, products]);

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

  return {
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveFromCart,
    totalPrice,
    cart,
    updateCart,
    setTotalPrice,
    isSync,
    setIsSync,
    products,
    setProducts,
  };
}
