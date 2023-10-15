import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useContractRead, useEnsAvatar } from "wagmi";
import { useEnsName } from "wagmi";
import { useAccount } from "wagmi";
import { is } from "date-fns/locale";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { ethGoerliAbi } from "@/lib/abiAdsRegister";

const Profileleft = () => {
  const [packageName, setPackageName] = React.useState([]);

  const { address: userAddress } = useAccount();

  const { data, isSuccess } = useContractRead({
    address: "0xF8431b7B6Bd716e425b57181d15AEFeF695de184",
    abi: ethGoerliAbi,
    functionName: "ads",
    args: [userAddress],
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setPackageName(data);
      return;
    }
  }, [isSuccess]);

  const { address: walletAdd, isDisconnected } = useAccount();
  const { data: ensName } = useEnsName();
  const { data: ensAvatar } = useEnsAvatar();

  function truncateLine(input) {
    if (input === null || input === undefined) {
      return ""; // or some placeholder like "Not connected"
    }

    let line = typeof input === "number" ? input.toString() : input;

    if (line.length > 8) {
      return line.slice(0, 4) + "..." + line.slice(-4);
    } else {
      return line;
    }
  }

  const router = useRouter();

  useEffect(() => {
    // Check if publicKey is present and redirect accordingly
    if (isDisconnected) {
      router.push("/"); // Replace with the actual path to mainpage.js
    }
  }, [isDisconnected, router]);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="w-3/12">
          <Card className="w-[350px] h-[500px] mt-10 ">
            <CardHeader className="my-6">
              {ensAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={ensAvatar}
                  alt="avatar"
                  className="w-20 h-20 rounded-full mb-4"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/avatar.png"
                  alt="avatar"
                  className="w-20 h-20 rounded-full mb-4"
                />
              )}
              {ensName ? (
                <CardTitle>Wallet Address: {ensName}</CardTitle>
              ) : (
                <CardTitle>Wallet Address: {truncateLine(walletAdd)}</CardTitle>
              )}
              {/* replace with ens or pub key */}
              {/* <CardDescription>
                Deploy your new project in one-click.
              </CardDescription> */}
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Package Type:</Label>
                    {packageName.length > 0 && (packageName[0] || "None")}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Subscription Time:</Label>
                    {packageName.length > 0 &&
                      (new Date(
                        parseInt(packageName[4]) * 1000
                      ).toLocaleString() ||
                        "None")}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Incentive Percentage:</Label>
                    {parseInt(Math.random() * 100)}%
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profileleft;
