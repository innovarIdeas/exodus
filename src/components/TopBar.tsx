
import Image from "next/image";
import React from "react";

const TopBar = () => {
  return (
    <div className="bg-white text-black py-3 px-14 flex items-center justify-between border border-bblack">
      <Image src="/img/magicwand.png" alt="logo" width={120} height={120} />
      <div className="flex items-center space-x-4">
        <Image src="/color-mode.svg" alt="color mode" width={36} height={36} />
        <Image
          src="/notif-icon.svg"
          alt="notification"
          width={36}
          height={36}
        />
        <Image src="/profile.svg" alt="profile" width={36} height={36} />
      </div>
    </div>
  );
};

export default TopBar;
