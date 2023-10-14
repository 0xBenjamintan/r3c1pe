import React from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import IpfsUpload from "./IpfsUpload";
import { useContractWrite } from "wagmi";
import { ethGoerliAbi } from "@/lib/abiAdsRegister";
import { set } from "date-fns";

export default function Profileright() {
  const [claimHash, setClaimHash] = React.useState("");

  const { write: claimOnClick } = useContractWrite({
    address: "0xF8431b7B6Bd716e425b57181d15AEFeF695de184",
    abi: ethGoerliAbi,
    functionName: "withdrawFunds",
    args: [10000000000000],
    onSuccess: (e) => {
      setClaimHash(e.hash);
    },
  });

  const statistics = [
    {
      item: "Click-Through Rate (CTR)",
      stats: "69%",
    },
    {
      item: "Cost Per Click (CPC)",
      stats: "$6.9/Click",
    },
    {
      item: "Return on Investment (ROI)",
      stats: "51%",
    },
    {
      item: "Ad Frequency",
      stats: "21%",
    },
    {
      item: "Bounce Rate",
      stats: "32%",
    },
  ];

  return (
    <div className="w-9/12 mt-10 px-10">
      <IpfsUpload />
      {/* <div>Statistic</div> */}
      <Card className="px-4 py-4 mb-6">
        <Table className="mt-6">
          <TableCaption className="font-bold">
            Marketing statistics
          </TableCaption>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[100px]">Invoice</TableHead> */}
              <TableHead className="font-bold">Description</TableHead>
              <TableHead className="font-bold">Statistics</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statistics.map((statistic) => (
              <TableRow key={statistic.item}>
                <TableCell>{statistic.item}</TableCell>
                <TableCell>{statistic.stats}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Card className="px-4 py-4 mb-6 grid place-items-center">
        <CardContent>
          <p className="font-bold text-xl mt-4">Incentive Eligibility</p>
        </CardContent>
        <CardDescription>
          Your revenue has reached above 0.00001 ETH, click the button below to
          claim your incentive.
        </CardDescription>
        {claimHash !== "" && (
          <div
            onClick={() => {
              window.open(`https://goerli.etherscan.io/tx/${claimHash}`);
            }}
            className="text-blue-500 hover:text-blue-700 cursor-pointer mt-2"
          >
            {claimHash}
          </div>
        )}
        <CardFooter>
          <Button
            className="mt-4"
            onClick={() => {
              claimOnClick();
            }}
          >
            Claim Incentive
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
