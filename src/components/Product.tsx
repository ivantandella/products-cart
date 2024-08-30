import { ProductType } from "../services/product.service";
import Card, { CardBody, CardFooter, CardHeader } from "./Card";

interface ProductComponentProps {
  products: ProductType[];
  handleAddToCart: (product: ProductType) => void;
}
export default function ProductComponent(props: ProductComponentProps) {
  const { products, handleAddToCart } = props;

  return (
    <div className="flex flex-wrap w-4/6">
      {products.length > 0 &&
        products.map((product) => (
          <Card key={product.id}>
            <CardHeader imageUrl={product.image} />
            <CardBody title={product.title}>{product.description}</CardBody>
            <CardFooter
              price={product.price}
              addToCart={() => handleAddToCart(product)}
            />
          </Card>
        ))}
    </div>
  );
}
