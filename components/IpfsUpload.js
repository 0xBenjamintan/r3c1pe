import React from "react";
import { useContractWrite } from "wagmi";
import { ipfsAbi } from "@/lib/abiIpfs";
import { Card } from "./ui/card";

export default function IpfsUpload() {
  const [hash, setHash] = React.useState("");
  const [content, setContent] = React.useState("");

  function onChange(e) {
    setContent(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    write();
  }

  const { write } = useContractWrite({
    address: "0xc463642999E3dC595a84a06722c34B987cBc34c7",
    abi: ipfsAbi,
    functionName: "generateHash",
    args: [content],
    onSuccess: (result) => {
      setHash(result.hash);
    },
  });

  return (
    <form>
      <Card className="mb-6">
        <div className="flex flex-col p-4">
          <label htmlFor="content">Upload to IPFS</label>
          <textarea
            name="content"
            placeholder="Content"
            onChange={(e) => {
              onChange(e);
            }}
            value={content}
            className="border-[1.5px] border-gray-300 rounded-md p-2 my-2 h-32 resize-none"
          />
          {hash !== "" && (
            <div
              onClick={() => {
                window.open(`https://goerli.etherscan.io/tx/${hash}`);
              }}
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              {hash}
            </div>
          )}
          <button
            type="submit"
            onClick={async (e) => await onSubmit(e)}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-min"
          >
            Submit
          </button>
        </div>
      </Card>
    </form>
  );
}
