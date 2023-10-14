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

const Profileleft = () => {
  return (
    <div className="top-0 left-0 w-3/12 borderr top-0 bottom-0 right-0">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Wallet Address: </CardTitle>
          <CardDescription>
            {/* replace with ens or pub key */}
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Package Type:</Label>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Description:</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Profileleft;
