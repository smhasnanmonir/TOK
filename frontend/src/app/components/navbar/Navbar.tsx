"use client";

import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleSearch = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedOutside =
        searchRef.current &&
        !searchRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target);

      if (clickedOutside) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-[#FFC2D1] shadow-md rounded-full px-6 py-3 flex items-center space-x-6 w-fit max-w-3xl mt-4 z-50 transition-all duration-300">
        <ul className="flex space-x-5 text-black font-semibold">
          <Link className="block relative group" href={"/"}>
            Home
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link className="block relative group" href={"/"}>
            Brands
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <button
            ref={buttonRef}
            onClick={toggleSearch}
            className="block relative group focus:outline-none cursor-pointer"
          >
            Search
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </button>
        </ul>
      </nav>

      {/* Search Box */}
      <div className="fixed top-[80px] left-1/2 transform -translate-x-1/2 z-40">
        <div
          ref={searchRef}
          className={`transition-all duration-300 transform ${
            open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-2 bg-white rounded-md shadow-md px-4 py-2 w-[300px]">
            <input
              className="flex-1 outline-none"
              type="text"
              placeholder="Search..."
            />
            <SearchIcon className="cursor-pointer" size={20} color="#000000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
