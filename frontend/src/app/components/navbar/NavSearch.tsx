"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

/* eslint-disable @typescript-eslint/no-explicit-any */
const NavSearch = ({ search_data }: { search_data: any }) => {
  return (
    <div>
      {search_data.length > 0 ? (
        <div className="bg-white py-[16px] px-[20px] rounded-md  flex flex-col space-y-2">
          {search_data?.map((data: any) => (
            <div
              key={data.id}
              className="py-[8px] border-2 border-[#E30B5D]/30 rounded-md px-[12px]"
            >
              <Link
                href={`/products/${data?.slug}`}
                className="flex items-center gap-2"
              >
                <img
                  src={data.img}
                  alt={data.name}
                  className="w-[40px] h-[40px] rounded-md"
                />
                <h1>{data.name}</h1>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NavSearch;
