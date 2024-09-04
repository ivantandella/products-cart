import Navbar from "../components/Navbar";
import Product from "../components/Product";
import Cart from "../components/Cart";
import useCart from "../hooks/use-cart";
import { useLogin } from "../hooks/use-login";

export default function ProductsPage() {
  const {
    cart,
    products,
    totalPrice,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveFromCart,
  } = useCart();

  useLogin();

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
