import React from "react";
import { useContractWrite } from "wagmi";
import { ipfsAbi } from "@/lib/abiIpfs";

export default function IpfsUpload() {
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
      alert("https://goerli.etherscan.io/tx/" + result.hash);
    },
  });

  return (
    <form>
      <label htmlFor="content">Content</label>
      <textarea
        name="content"
        placeholder="Content"
        onChange={(e) => {
          onChange(e);
        }}
        value={content}
      />
      <button type="submit" onClick={async (e) => await onSubmit(e)}>
        Submit
      </button>
    </form>
  );
}
