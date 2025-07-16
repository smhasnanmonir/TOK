const AddToCartButton = () => {
  return (
    <button className="block cursor-pointer rounded-md px-5 py-2.5 overflow-hidden group bg-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-pink-400 transition-all ease-out duration-300 text-center w-full mx-auto relative">
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span className="relative font-semibold">Add to Cart</span>
    </button>
  );
};

export default AddToCartButton;
