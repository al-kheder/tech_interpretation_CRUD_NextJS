import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="p-6 border-b flex justify-between items-center bg-blue-500 rounded-bl-lg rounded-br-lg ">
      <Link className="text-2xl font-bold text-white " href={"/"}>Tech Interpretations</Link>
      <Link className="bg-slate-100 grid place-items-center py-2 px-4 rounded-full font-bold shadow-md" href={"/create"}>Add New</Link>
    </header>
  );
}

export default Header;
