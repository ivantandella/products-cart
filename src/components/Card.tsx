import { Link } from "react-router-dom";
import { currencyConversion } from "../utils/number";
import Button from "./Button";

type CardProps = {
  children: React.ReactNode;
};

export default function Card(props: CardProps) {
  const { children } = props;
  return (
    <div className="my-4 mx-4 w-full max-w-sm bg-gray-700 border rounded-lg shadow border-gray-800 flex flex-col justify-between">
      {children}
    </div>
  );
}

type CardHeaderProps = {
  imageUrl: string;
  id: number;
};
export function CardHeader(props: CardHeaderProps) {
  const { imageUrl, id } = props;
  return (
    <Link to={`/product/${id}`}>
      <img
        src={imageUrl}
        alt="shoes"
        className="p-8 rounded-t-lg h-60 w-full object-cover"
      />
    </Link>
  );
}

type CardBodyProps = {
  title: string;
  children: string;
};
export function CardBody(props: CardBodyProps) {
  const { title, children } = props;
  return (
    <div className="px-5 pb-5 h-full">
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-white">
          {title.substring(0, 20)}...
        </h5>
        <p className="text-m text-white">{children.substring(0, 100)}...</p>
      </a>
    </div>
  );
}

interface CardFooterProps {
  addToCart: () => void;
  price: number;
}
export function CardFooter(props: CardFooterProps) {
  const { price, addToCart } = props;
  return (
    <div className="flex items-center justify-between px-5 pb-5">
      <span className="text-xl font-bold text-white">
        {currencyConversion(price)}
      </span>
      <Button onClick={addToCart}>Add to cart</Button>
    </div>
  );
}
