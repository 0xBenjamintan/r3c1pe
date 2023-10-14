import React from "react";
import { Input } from "@/components/ui/input";

export default function Profileright() {
  return (
    <div className="w-9/12 mt-10 px-10">
      <Input type="text" placeholder="Enter ur Desc" />
      <br />
      <input type="file" id="myFile" accept="image/*"></input>
      <br />
      <br />
      <button className="card-button pt-10">Update</button>
      <p>ipfs return hash(let them click)</p>
      <div>
      Statistic
    </div>
    </div>
  );
}
