import React, { useState } from "react";
import Link from "next/link";
import { MarketItem } from "../pages";
import { ethers } from "ethers";
import Button from "./common/Button";
import { SellDialog } from "./SellDialog";

interface Props {
  nft: MarketItem;
}

const NFTCard = ({ nft }: Props) => {
  // const [sell, setSell] = useState(false);

  return (
    <div className="relative text-gray-200 cursor-pointer shadow-homogen bg-background rounded-2xl">
      <span className="absolute z-10 inline-flex items-center px-3 text-sm font-semibold text-white bg-primary rounded-full  right-2 top-2">
        # <span className="pl-1 text-xl">{nft.itemId}</span>
      </span>
      <Link href={`/items/${nft.itemId}`}>
        <div>
          <div className="p-4">
            <img
              src={nft.image}
              className="object-cover aspect-square rounded-2xl"
            />
          </div>
          <div className="px-4 pb-4">
            <div className="mt-2 mb-4 space-y-3 sm:pr-8">
              <h5 className="text-xl font-semibold ">{nft.name}</h5>
              <p className="text-lg text-gray-400">{nft.description}</p>
              <p className="inline-flex justify-between w-full text-2xl font-bold text-white font-inter">
                <span className="text-xl font-medium text-gray-400">
                  price{" "}
                </span>{" "}
                {ethers.utils.formatEther(nft.price)} PRING
              </p>
            </div>
            {/* <div className="flex items-center space-x-2 justify-evenly">
          <Button onClick={() => setSell(true)}>Sell</Button>
          <Link href={`/items/${nft.itemId}`}>
            <Button type="secondary">Details</Button>
          </Link>
        </div> */}
          </div>
        </div>
      </Link>

      {/* <SellDialog
        itemId={nft.itemId}
        open={sell}
        onClose={() => setSell(false)}
      /> */}
    </div>
  );
};

export default NFTCard;
