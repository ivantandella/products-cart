import { useImmerReducer } from "use-immer";
import { getProducts, ProductType } from "../services/product.service";
import { useEffect, useState } from "react";
import useTotalPrice from "./use-total-price";

export type CartType = {
  id: number;
  title: string;
  quantity: number;
};

export type CartActionType =
  | {
      type: "SYNC_WITH_LOCAL_STORAGE";
      payload: {
        cart: string;
      };
    }
  | {
      type: "ADD_TO_CART";
      payload: {
        id: number;
        title: string;
      };
    }
  | {
      type: "INCREASE_QUANTITY";
      payload: {
        id: number;
      };
    }
  | {
      type: "DECREASE_QUANTITY";
      payload: {
        id: number;
      };
    }
  | {
      type: "REMOVE_ITEM";
      payload: {
        id: number;
      };
    };

export function cartReducer(draft: CartType[], action: CartActionType) {
  switch (action.type) {
    case "SYNC_WITH_LOCAL_STORAGE": {
      draft.push(...JSON.parse(action.payload.cart));
      break;
    }
    case "ADD_TO_CART": {
      const currentItem = draft.find((item) => item.id === action.payload.id);
      if (currentItem) {
        currentItem.quantity += 1;
      } else {
        draft.push({
          id: action.payload.id,
          title: action.payload.title,
          quantity: 1,
        });
      }
      break;
    }
    case "INCREASE_QUANTITY": {
      const currentItem = draft.find((item) => item.id === action.payload.id);
      if (currentItem) {
        currentItem.quantity += 1;
      }
      break;
    }
    case "DECREASE_QUANTITY": {
      const currentItem = draft.find((item) => item.id === action.payload.id);
      if (currentItem && currentItem.quantity > 1) {
        currentItem.quantity -= 1;
      } else {
        return draft.filter((item) => item.id !== action.payload.id);
      }
      break;
    }
    case "REMOVE_ITEM": {
      return draft.filter((item) => item.id !== action.payload.id);
    }
    default: {
      return draft;
    }
  }
}

export default function useCart() {
  const [cart, dispatch] = useImmerReducer<CartType[], CartActionType>(
    cartReducer,
    []
  );
  const [isSync, setIsSync] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const { totalPrice, onUpdateTotalPrice } = useTotalPrice();

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
  }, []);

  // sync cart with local storage
  useEffect(() => {
    if (isSync) return;
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch({
        type: "SYNC_WITH_LOCAL_STORAGE",
        payload: {
          cart: storedCart,
        },
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

    onUpdateTotalPrice(sum);

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, products, onUpdateTotalPrice]);

  function handleAddToCart(product: ProductType) {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product.id,
        title: product.title,
      },
    });
  }

  function handleIncreaseQuantity(cart: CartType) {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: {
        id: cart.id,
      },
    });
  }

  function handleDecreaseQuantity(cart: CartType) {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: {
        id: cart.id,
      },
    });
  }

  function handleRemoveFromCart(cart: CartType) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        id: cart.id,
      },
    });
  }

  return {
    cart,
    products,
    totalPrice,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveFromCart,
  };
}

// export default function useCart() {
//   const [cart, updateCart] = useImmer<CartType[]>([]);
//   const [isSync, setIsSync] = useState(false);
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const { totalPrice, onUpdateTotalPrice } = useTotalPrice();

//   // const [totalPrice, setTotalPrice] = useState(0);
//   // const dispatch = useTotalPriceDispatch();
//   // const { total } = useTotalPrice();

//   useLogin();

//   // get product from api
//   useEffect(() => {
//     async function exec() {
//       try {
//         const data = await getProducts();
//         setProducts(data);
//       } catch (error: any) {
//         alert(error.message);
//         setProducts([]);
//       }
//     }
//     exec();

//     // getProducts((data) => {
//     //   setProducts(data);
//     // });
//   }, []);

//   // sync cart with local storage
//   useEffect(() => {
//     if (isSync) return;
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) {
//       updateCart((draft) => {
//         draft.push(...JSON.parse(storedCart));
//       });
//     }
//     setIsSync(true);
//   }, []);

//   // update total price
//   useEffect(() => {
//     const sum = cart.reduce((prev, item) => {
//       const product = products.find((product) => product.id === item.id);
//       if (product) {
//         return prev + product.price * item.quantity;
//       } else {
//         return prev;
//       }
//     }, 0);

//     // setTotalPrice(sum);

//     // dispatch({
//     //   type: "UPDATE_TOTAL_PRICE",
//     //   payload: {
//     //     total: sum,
//     //   },
//     // });

//     onUpdateTotalPrice(sum);

//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart, products, onUpdateTotalPrice]);

//   function handleAddToCart(product: ProductType) {
//     updateCart((draft) => {
//       const currentItem = draft.find((item) => item.id === product.id);
//       if (currentItem) {
//         currentItem.quantity += 1;
//       } else {
//         draft.push({ id: product.id, title: product.title, quantity: 1 });
//       }
//     });
//   }

//   function handleIncreaseQuantity(cart: CartType) {
//     updateCart((draft) => {
//       const currentItem = draft.find((item) => item.id === cart.id);
//       if (currentItem) {
//         currentItem.quantity += 1;
//       }
//     });
//   }

//   function removeItem(draft: CartType[], cart: CartType) {
//     const index = draft.findIndex((item) => item.id === cart.id);
//     if (index !== -1) {
//       draft.splice(index, 1);
//     }
//   }

//   function handleDecreaseQuantity(cart: CartType) {
//     updateCart((draft) => {
//       const currentItem = draft.find((item) => item.id === cart.id);
//       if (currentItem && currentItem.quantity > 1) {
//         currentItem.quantity -= 1;
//       } else {
//         removeItem(draft, cart);
//       }
//     });
//   }

//   function handleRemoveFromCart(cart: CartType) {
//     updateCart((draft) => {
//       removeItem(draft, cart);
//       // draft.splice(draft.indexOf(cart), 1);
//     });
//   }

//   return {
//     handleAddToCart,
//     handleIncreaseQuantity,
//     handleDecreaseQuantity,
//     handleRemoveFromCart,
//     totalPrice,
//     cart,
//     updateCart,
//     isSync,
//     setIsSync,
//     products,
//     setProducts,
//   };
// }

// export default function useCart() {
//   const [cart, updateCart] = useImmer<CartType[]>([]);
//   const [totalPrice, setTotalPrice] = React.useState(0);
//   const [isSync, setIsSync] = React.useState(false);
//   const [products, setProducts] = React.useState<ProductType[]>([]);

//   React.useEffect(() => {
//     async function exec() {
//       try {
//         const data = await getProducts();
//         setProducts(data);
//       } catch (error: any) {
//         alert(error.message);
//         setProducts([]);
//       }
//     }
//     exec();
//     // getProducts((data) => {
//     //   setProducts(data);
//     // });
//   }, []);

//   React.useEffect(() => {
//     if (isSync) return;
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) {
//       updateCart((draft) => {
//         draft.push(...JSON.parse(storedCart));
//       });
//     }
//     setIsSync(true);
//   }, []);

//   React.useEffect(() => {
//     const sum = cart.reduce((acc, item) => {
//       const product = products.find((product) => product.id === item.id);
//       if (product) {
//         return acc + product.price * item.quantity;
//       } else {
//         return acc;
//       }
//     }, 0);
//     setTotalPrice(sum);

//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart, products]);

//   function handleAddToCart(product: ProductType) {
//     updateCart((draft) => {
//       const currentItem = draft.find((item) => item.id === product.id);
//       if (currentItem) {
//         currentItem.quantity += 1;
//       } else {
//         draft.push({ id: product.id, title: product.title, quantity: 1 });
//       }
//     });
//   }

//   function handleIncreaseQuantity(cart: CartType) {
//     updateCart((draft) => {
//       const currentItem = draft.find((item) => item.id === cart.id);
//       if (currentItem) {
//         currentItem.quantity += 1;
//       }
//     });
//   }

//   function removeItem(draft: CartType[], cart: CartType) {
//     const index = draft.findIndex((item) => item.id === cart.id);
//     if (index !== -1) {
//       draft.splice(index, 1);
//     }
//   }

//   function handleDecreaseQuantity(cart: CartType) {
//     updateCart((draft) => {
//       const currentItem = draft.find((item) => item.id === cart.id);
//       if (currentItem && currentItem.quantity > 1) {
//         currentItem.quantity -= 1;
//       } else {
//         removeItem(draft, cart);
//       }
//     });
//   }

//   function handleRemoveFromCart(cart: CartType) {
//     updateCart((draft) => {
//       removeItem(draft, cart);
//       // draft.splice(draft.indexOf(cart), 1);
//     });
//   }

//   return {
//     handleAddToCart,
//     handleIncreaseQuantity,
//     handleDecreaseQuantity,
//     handleRemoveFromCart,
//     totalPrice,
//     cart,
//     updateCart,
//     setTotalPrice,
//     isSync,
//     setIsSync,
//     products,
//     setProducts,
//   };
// }
