import Navbar from "../components/Navbar";
import Product from "../components/Product";
import Cart from "../components/Cart";
import useCart from "../hooks/use-cart";

export default function ProductsPage() {
  const {
    products,
    handleAddToCart,
    cart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveFromCart,
    totalPrice,
  } = useCart();

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
