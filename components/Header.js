import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import dynamic from "next/dynamic";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useAccount } from "wagmi";
import Link from "next/link";

const Header = () => {
  const { address } = useAccount();
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
          {/* <Menubar>
            <MenubarMenu>
              <MenubarTrigger as={Link} to="/">
                Home
              </MenubarTrigger>
              <MenubarTrigger as={Link} to="/plans">
                Plans
              </MenubarTrigger>
              {address ? (
                <MenubarTrigger as={Link} to="/profile">
                  Profile
                </MenubarTrigger>
              ) : null}
            </MenubarMenu>
          </Menubar> */}

          <Link href="/" className="w-[30%]">
            <p className="text-xl hover w-full text-center rounded-[15px] py-1 border-gray-350 border-2 text-gray-350 transition-[2.5]">
              Home
            </p>
          </Link>
          {/* <p className="text-2xl ml-2">|</p> */}
          <Link href="/plans" className="w-[30%]">
            <p className="text-xl hover w-full text-center rounded-[15px] py-1 border-gray-350 border-2 text-gray-350 transition-[2.5]">
              Plan
            </p>
          </Link>
          {/* <p className="text-2xl ml-2">|</p> */}
          {address ? (
            <Link href="/profile" className="w-[30%]">
              <p className="text-xl hover w-full text-center rounded-[15px] py-1 border-gray-350 border-2 text-gray-350 transition-[2.5]">
                Profile
              </p>
            </Link>
          ) : null}
        </div>
        <div className="flex flex-wrap justify-end">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
