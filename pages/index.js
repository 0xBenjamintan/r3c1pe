import Image from "next/image";
import { Inter, Plaster } from "next/font/google";
import Planscard from "@/components/Planscard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex flex-col justify-between p-24 ${inter.className}`}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 mt-4 md:mt-0 flex flex-col justify-center">
          {/* Right Column (Title) */}
          <h1 className="text-5xl font-bold">
            <span className="text-blue-500"> R3C1PE</span>
          </h1>
          <p className="text-3xl mt-8">
            Burning <span className="text-gradient">NFTs</span> for a Purpose,
            Fueling Charitable Acts Worldwide
          </p>
        </div>
        <div className="md:w-3/4 h-[500px] flex justify-end	">
          {/* Left Column (Image) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero1.png" alt="Market Icon" />
        </div>
      </div>
    </main>
  );
}
