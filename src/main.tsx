import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login.tsx";
import RegisterPage from "./pages/register.tsx";
import ProductsPage from "./pages/products.tsx";
import ErrorPage from "./pages/error.tsx";
import DetailProductPage from "./pages/detail-product.tsx";
import DarkModeContextProvider from "./context/DarkMode.tsx";
import { TotalPriceProvider } from "./context/TotalPriceContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/products/:id",
    element: <DetailProductPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeContextProvider>
      {/* <TotalPriceProvider> */}
      <RouterProvider router={router} />
      {/* </TotalPriceProvider> */}
    </DarkModeContextProvider>
  </StrictMode>
);
