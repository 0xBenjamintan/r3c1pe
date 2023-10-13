import Image from "next/image";
import { Inter, Plaster } from "next/font/google";
import Planscard from "@/components/Planscard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 h-[500px] pr-8 flex flex-col justify-center">
          {/* Left Column (Image) */}
          <img src="/web-development.png" alt="Market Icon" />
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0 flex flex-col justify-center">
          {/* Right Column (Title) */}
          <h1 className="text-5xl font-bold">
            Welcome to
            <span className="text-blue-500"> R3C1PE</span>
          </h1>
          <p className="text-3xl mt-8 text-justify">
            Burning <span className="text-gradient">NFTs</span> for a Purpose,
            Fueling Charitable Acts Worldwide
          </p>
          <p className="text-2xl mt-8 text-justify">
            Establishing a groundbreaking protocol enabling users to
            effortlessly support public goods using their untapped resources.
          </p>
          <p className="text-xl mt-8 text-gradient font-bold"></p>
        </div>
      </div>
    </main>
  );
}
