import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full h-[90px] flex items-center justify-between p-5 shadow-md">
      <img src="/img/magicwand.png" className="h-[60px]" />
      <button className="bg-main text-white rounded-full h-[50px] w-[12%] font-semibold">
        Get a Qoute
      </button>
    </nav>
  );
};

export default Navbar;
