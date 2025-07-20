"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FormEvent, ChangeEvent } from "react";

const SearchBrands = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (!term) {
      params.delete("query");
      replace(`${pathname}?${params.toString()}`);
    }
  };

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
          defaultValue={searchParams.get("query")?.toString()}
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
