import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import dynamic from "next/dynamic";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const Header = () => {
  return (
    <header className="flex flex-col gap-5 border-b border-gray-350">
      <div className="py-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <Image
              width={36}
              height={36}
              src="/favicon.ico"
              className="w-8 md:w-9"
              alt="logo"
            />
            <p className="text-2xl font-bold ml-2">R3C1PE</p>
          </div>
        </Link>
        <div className="flex w-[30%] justify-between">
          <Link href="/" className="w-[30%]">
            <p className="text-2xl hover w-full text-center rounded-[15px] py-1 border-[#2563eb] border-2 text-[#2563eb] transition-[2.5]">
              Home
            </p>
          </Link>
          {/* <p className="text-2xl ml-2">|</p> */}
          <Link href="/plans" className="w-[30%]">
            <p className="text-2xl hover w-full text-center rounded-[15px] py-1 border-[#2563eb] border-2 text-[#2563eb] transition-[2.5]">
              Plan
            </p>
          </Link>
          {/* <p className="text-2xl ml-2">|</p> */}
          <Link href="/profile" className="w-[30%]">
            <p className="text-2xl hover w-full text-center rounded-[15px] py-1 border-[#2563eb] border-2 text-[#2563eb] transition-[2.5]">
              Profile
            </p>
          </Link>
        </div>
        <div className="flex flex-wrap justify-end">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
