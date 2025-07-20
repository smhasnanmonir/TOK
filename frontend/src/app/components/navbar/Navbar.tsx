"use client";

import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import NavSearch from "./NavSearch";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [activeLink, setActiveLink] = useState<string | null>(null); // New state for active link
  const searchRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const toggleSearch = () => {
    setOpen((prev) => !prev);
  };

  const pathname = usePathname();

  useEffect(() => {
    console.log("Current client-side path:", pathname);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedOutside =
        searchRef.current &&
        !searchRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        searchBoxRef.current &&
        !searchBoxRef.current.contains(target);

      if (clickedOutside) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    console.log(name);
    const page = 1;
    const pageSize = 10;
    setName(name);
    if (name.length > 0) {
      const response = await fetch(
        `https://backend.tokbd.shop/api/products/search/${name}?page=${page}&pageSize=${pageSize}`
      );
      const data = await response.json();
      if (data.result?.length > 0) {
        setSearchData(data.result);
      }
    } else {
      setSearchData([]);
    }
  };

  return (
    <div className="block">
      {/* Fixed Navbar */}
      <nav
        className={`inset-shadow-indigo-500/35 fixed top-0 left-1/2 transform -translate-x-1/2 backdrop-blur-[12px] border-[1px] border-pink-400/35 shadow-pink-400/35 rounded-full px-3 sm:px-6 py-2 sm:py-3 flex items-center space-x-2 sm:space-x-6 w-fit max-w-[90vw] md:mt-4 mt-2 sm:max-w-3xl z-50 transition-all duration-300 ease-linear ${
          open || activeLink ? "scale-110" : "scale-100"
        } ${pathname !== "/" ? "bg-pink-400/10" : "bg-white/10 "}`}
      >
        <ul className="flex space-x-2 sm:space-x-5 text-black font-semibold text-sm sm:text-base">
          <Link
            className={`block relative group cursor-pointer ${
              activeLink === "home"
                ? "underline underline-offset-4 decoration-pink-500"
                : ""
            }`}
            href={"/"}
            onClick={() => {
              setActiveLink("home");
              setTimeout(() => setActiveLink(null), 1000);
            }}
          >
            Home
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            className={`block relative group cursor-pointer ${
              activeLink === "brands"
                ? "underline underline-offset-4 decoration-pink-500"
                : ""
            }`}
            href={"/brands"}
            onClick={() => {
              setActiveLink("brands");
              setTimeout(() => setActiveLink(null), 1000);
            }}
          >
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
      <div className="fixed top-[60px] sm:top-[80px] left-1/2 transform -translate-x-1/2 z-40 w-[80%]">
        <div
          ref={searchRef}
          className={`transition-all duration-300 transform ${
            open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-2 bg-white rounded-md shadow-md px-4 py-2 w-[280px] sm:w-[300px] mx-auto">
            <input
              className="flex-1 outline-none text-sm sm:text-base"
              type="text"
              placeholder="Search..."
              name="name"
              onChange={handleSearch}
            />
            <SearchIcon
              className="cursor-pointer w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]"
              color="#000000"
            />
          </div>
        </div>
      </div>

      {/* Search Result */}
      <div
        ref={searchBoxRef}
        onClick={() => setOpen(false)}
        className={`w-[80%] md:w-auto mx-auto transition-all duration-500 fixed top-[120px] sm:top-[120px] left-1/2 transform -translate-x-1/2 z-40 ${
          open && name.length > 0
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <NavSearch search_data={searchData} />
      </div>
    </div>
  );
};

export default Navbar;
