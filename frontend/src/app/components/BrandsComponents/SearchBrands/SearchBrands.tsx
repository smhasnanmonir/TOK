"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FormEvent, ChangeEvent, useCallback, useMemo } from "react";

const SearchBrands = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Memoize the current query to avoid unnecessary re-renders
  const currentQuery = useMemo(
    () => searchParams.get("query")?.toString() || "",
    [searchParams]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const term = formData.get("search") as string;
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, replace]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      // Only clear the query when input is completely empty
      if (!term) {
        const params = new URLSearchParams(searchParams);
        params.delete("query");
        replace(`${pathname}?${params.toString()}`);
      }
      // Don't update URL on every keystroke - only on form submit or clear
    },
    [searchParams, pathname, replace]
  );

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col space-y-[12px]"
      >
        <input
          name="search"
          className="block md:w-[400px] w-full border border-gray-300 rounded-md p-[12px]"
          type="text"
          placeholder="Search brands"
          defaultValue={currentQuery}
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
