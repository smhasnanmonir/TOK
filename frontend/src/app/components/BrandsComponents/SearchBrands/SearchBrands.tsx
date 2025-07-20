"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";

const SearchBrands = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchValue.trim()) {
        router.push(`/brands?search=${encodeURIComponent(searchValue.trim())}`);
      } else {
        router.push("/brands");
      }
    },
    [searchValue, router]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);

      // If input becomes empty, immediately navigate to /brands
      if (!value.trim()) {
        router.push("/brands");
      }
    },
    [router]
  );

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col space-y-[12px]"
      >
        <input
          className="block md:w-[400px] w-full border border-gray-300 rounded-md p-[12px]"
          type="text"
          placeholder="Search brands"
          value={searchValue}
          onChange={handleInputChange}
        />
        <button
          className="max-w-fit bg-pink-500 cursor-pointer text-white px-[48px] py-[12px] rounded-md"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBrands;
