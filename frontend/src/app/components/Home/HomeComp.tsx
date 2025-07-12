import Navbar from "../navbar/Navbar";
import BestSellerProduct from "./BestSellers/BestSellerProduct";
import HeroSection from "./HeroSection";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import ShopByConcern from "./ShopByConcern/ShopByConcern";
import ShopByTopBrand from "./ShopByTopBrand/ShopByTopBrand";
import ShopByType from "./ShopByType/ShopByType";

const HomeComp = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <Navbar />
      <HeroSection />
      <BestSellerProduct />
      <ShopByTopBrand />
      <ShopByCategory />
      <ShopByType />
      <ShopByConcern />
    </div>
  );
};

export default HomeComp;
