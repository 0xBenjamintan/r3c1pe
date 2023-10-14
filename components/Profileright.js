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

export default function Profileright() {
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
          {/* add variable value in {} from contract, this is the revenue value */}
          Your revenue has reached above {}, click the button below to clain
          your incentive.
        </CardDescription>
        <CardFooter>
          <Button className="mt-4">Claim Incentive</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
