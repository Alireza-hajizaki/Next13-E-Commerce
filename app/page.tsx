import Container from "./components/Container";
import HomeBanner from "./components/nav/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import { products } from "./components/utils/products";
import { truncateText } from "./components/utils/truncateText";

export default function Home() {
  return (
   <div className="p-8">
    <Container>
      <div>
        <HomeBanner/>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {products.map((product:any)=> {
          return <ProductCard data={product}/>
          // return <div>{truncateText(product.name)}</div>
        })}
      </div>
    </Container>
   </div>
  )
}
