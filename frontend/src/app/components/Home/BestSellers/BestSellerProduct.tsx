/* eslint-disable @next/next/no-img-element */

import ProductCard from "../../shared/Cards/ProductCard";
import ShopBy from "../../shared/ShopBy/ShopBy";

const BestSellerProduct = async () => {
  const data = await fetch("https://backend.tokbd.shop/api/products/fetch", {
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  });
  const products = await data.json();
  return (
    <div className="md:px-[20px]">
      <div>
        <ShopBy title="Best Sellers"></ShopBy>
        <div className="grid md:grid-cols-4 grid-cols-2 md:gap-6 gap-4 px-[10px]">
          {products?.result.map(
            (product: {
              id: number;
              name: string;
              img: string;
              price: number;
              slug: string;
            }) => (
              <ProductCard
                key={product.id}
                img={product.img}
                name={product.name}
                price={product.price}
                slug={product.slug}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSellerProduct;
