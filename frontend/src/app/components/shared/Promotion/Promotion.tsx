import { Clock7Icon, HandCoinsIcon, ShipIcon } from "lucide-react";
const Promotion = () => {
  return (
    <>
      <div className="grid space-y-[8px]">
        <div className="flex gap-[24px]">
          <div className="grid  justify-items-center border-2 p-4 rounded-md border-gray-200 inset-shadow-sm inset-shadow-pink-100 hover:inset-shadow-pink-300 transition-all ease-linear duration-300 cursor-pointer">
            <ShipIcon size={34} color="#FB6F92" />
            <p>Imported from Korea</p>
          </div>
          <div className="grid  justify-items-center border-2 p-4 rounded-md border-gray-200 inset-shadow-sm inset-shadow-pink-100 hover:inset-shadow-pink-300 transition-all ease-linear duration-300 cursor-pointer">
            <Clock7Icon size={34} color="#FB6F92" />
            <p>24/7 Human Support</p>
          </div>
          <div className="grid  justify-items-center border-2 p-4 rounded-md border-gray-200 inset-shadow-sm inset-shadow-pink-100 hover:inset-shadow-pink-300 transition-all ease-linear duration-300 cursor-pointer">
            <HandCoinsIcon size={34} color="#FB6F92" />
            <p>Cash on Delivery</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Promotion;
