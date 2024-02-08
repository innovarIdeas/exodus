import Image from "next/image";
// import { ProfileDrop } from "@/components/ProfileDrop";

export default function ClientTopBar () {
  return (
    <div className="bg-white text-black py-3 px-14 flex items-center justify-between border border-bblack w-full ">
      <Image src="/clientLogo.svg" alt="Okoh International" width={252} height={38}/>
      <div className="flex items-center space-x-4">
        <Image src="/color-mode.svg" alt="color mode" width={36} height={36}/>
        <Image src="/notif-icon.svg" alt="notification" width={36} height={36}/>
        {/* <ProfileDrop/> */}
      </div>

    </div>
  );
}
