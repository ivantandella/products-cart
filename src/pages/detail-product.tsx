import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailProduct, ProductType } from "../services/product.service";
import { currencyConversion } from "../utils/number";

export default function DetailProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function exec() {
      try {
        setLoading(true);
        const data = await getDetailProduct(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    exec();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="font-bold">Loading...</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="w-100 min-h-screen flex justify-center items-center">
      <div className="flex font-sans max-w-xl">
        <div className="flex-none w-48 relative">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <h1 className="flex-auto text-lg font-semibold text-slate-900">
              {product.title}
            </h1>
            <div className="text-lg font-semibold text-slate-500">
              {currencyConversion(product.price)}
            </div>
            <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
              Rate {product.rating.rate} out of {product.rating.count} reviews
            </div>
          </div>
          <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
            <div className="space-x-2 flex text-sm">{product.description}</div>
          </div>
        </form>
      </div>
    </div>
  );
}
