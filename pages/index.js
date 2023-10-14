import Image from "next/image";
import { Inter, Plaster } from "next/font/google";
import Planscard from "@/components/Planscard";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    // Check if publicKey is present and redirect accordingly
    if (address) {
      router.push("/plans"); // Replace with the actual path to mainpage.js
    }
  }, [address, router]);

  return (
    <main className={`flex flex-col justify-between p-24 ${inter.className}`}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 mt-4 md:mt-0 flex flex-col justify-center">
          {/* Right Column (Title) */}
          <h1 className="text-5xl font-bold">
            <span className="text-blue-500"> R3C1PE</span>
          </h1>
          <p className="text-3xl mt-8">Where Ads Soar Beyond Chains</p>
        </div>
        <div className="md:w-3/4 h-[500px] flex justify-end	">
          {/* Left Column (Image) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero1.png" alt="Market Icon" />
        </div>
      </div>
      <br />
      <br />
      <br />
      {/* second session */}
      <div>
        <h1 className="text-5xl font-bold">
          <span className="text-blue-500"> What do we do?</span>
        </h1>
        <br />
        <br />
        <div className="flex">
          <div className="w-4/12 card">
            <h1 className="text-2xl font-bold">
              <span className="text-blue-500"> Transparent advertising </span>
            </h1>
            <br />
            <p className="text-justify px-0.5">
              Leveraging blockchain technology to ensure complete transparency
              in the advertising process. All transactions, engagements, and ad
              placements are verifiable through the blockchain, eliminating
              hidden costs and promoting trust.
            </p>
          </div>
          <div className="w-4/12 card">
            <h1 className="text-2xl font-bold">
              <span className="text-blue-500"> Decentralized Ecosystem </span>
            </h1>
            <br />
            <p className="text-justify px-0.5">
              Providing users with an all-in-one platform for advertising on
              decentralized applications (dApps), where they can set their ads
              for maximum visibility and reach the entire blockchain community.
            </p>
          </div>
          <div className="w-4/12 card">
            <h1 className="text-2xl font-bold">
              <span className="text-blue-500">
                Equitable access for advertising opportunity
              </span>
            </h1>
            <br />
            <p className="text-justify px-0.5">
              Leveling the playing field for users of all sizes. This fairness
              encourages a diverse range of advertisers, fostering inclusivity
              and democratizing advertising within the platform.
            </p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      {/* Third session */}
      <div>
        <h1 className="text-5xl font-bold">
          <span className="text-blue-500"> Why R3C1PE?</span>
        </h1>
        <br />
        <br />
        <div className="flex">
          <div className="w-4/12 card">
            <h1 className="text-2xl font-bold">
              <span className="text-blue-500">
                {" "}
                Cost-Efficiency and Eliminating Intermediaries{" "}
              </span>
            </h1>
            <br />
            <p className="text-justify">
              With a one-time transaction, R3C1PE eliminates the need for costly
              intermediaries in the advertising process. Advertisers can enjoy
              all-inclusive advertising services without the burden of
              additional fees or middleman charges. This not only reduces the
              cost of advertising but also streamlines the entire process,
              making it more accessible and affordable for businesses of all
              sizes.
            </p>
          </div>
          <div className="w-4/12 card">
            <h1 className="text-2xl font-bold">
              <span className="text-blue-500">
                {" "}
                Equitable Opportunities and Fair Compensation{" "}
              </span>
            </h1>
            <br />
            <p className="text-justify">
              R3C1PE is committed to fairness. We provide every user, whether a
              small business or a large enterprise, with equal opportunities to
              promote their products or services. Our revenue model, based on
              Clicks Per Minute (CPM), ensures that users are fairly compensated
              for the engagement their ads generate. This fosters a sense of
              equity and inclusivity, allowing advertisers to compete on a level
              playing field.
            </p>
          </div>
          <div className="w-4/12 card">
            <h1 className="text-2xl font-bold">
              <span className="text-blue-500">Transparency brings Trust</span>
            </h1>
            <br />
            <p className="text-justify">
              R3C1PE introduces a level of transparency that is unprecedented in
              the advertising industry. By utilizing blockchain technology, we
              ensure that every transaction, engagement, and ad placement is
              recorded, auditable, and verifiable. This level of transparency
              builds trust among our users, as they can independently verify the
              effectiveness of their ad campaigns and trust that there are no
              hidden costs or deceptive practices in play.
            </p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* fourth session */}
      <div className="min-h-screen">
        <h1 className="text-5xl font-bold">
          <span className="text-blue-500"> FAQ</span>
        </h1>
        <br />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div className="flex flex-col mx-auto max-w-6xl place-content-center">
          <div className="flex flex-col md:flex-row">
            <div className="mt-4 md:mt-0 flex flex-col justify-center">
              {/* Right Column (Title) */}
              <h1 className="text-4xl font-bold">
                <span className=" text-center">
                  Ready to Scale up your Business?
                </span>
              </h1>
              <p className="text-lg mt-8 font-bold">
                <ConnectButton />
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
