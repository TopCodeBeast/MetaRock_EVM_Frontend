import type { NextPage } from "next";
import { BigNumber, ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import * as animationData from "../animations/wings.json";
import axios from "axios";
import NFTCard from "../components/NFTCard";
import { getMarketContract, getTokenContract } from "./api/blockchainService";
import { GlowButton } from "../components/common/GlowButton";
import NFTBuyCard from "../components/NFTBuyCard";
import { useSpinner } from "../components/common/SpinnerContext";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
    isClickToPauseDisabled: true,
};

export type MarketItem = {
    price: BigNumber;
    name: string;
    description: string;
    image: string;
    owner: string;
    seller: string;
    isSold: boolean;
    tokenId: number;
    itemId: number;
};
const Home: NextPage = () => {
    const [NFTs, setNFTs] = useState<MarketItem[] | undefined>([]);
    const { showSpinner, hideSpinner } = useSpinner();

    useEffect(() => {
        loadNFTs();
    }, []);

    async function loadNFTs() {
        showSpinner();
        const data = await getMarketContract().getAllMarketItems();
        const items = await Promise.all(
            data.map(async (nft) => {
                const tokenURI = await getTokenContract().tokenURI(nft.tokenId);
                const metadata = await axios.get(`https://ipfs.io/ipfs/${tokenURI}`);
                const marketItem: MarketItem = {
                    name: metadata.data.name,
                    image: `https://ipfs.io/ipfs/${metadata.data.image}`,
                    description: metadata.data.description,
                    seller: nft.seller,
                    owner: nft.owner,
                    isSold: nft.isSold,
                    tokenId: nft.tokenId.toNumber(),
                    itemId: nft.itemId.toNumber(),
                    price: nft.price,
                };
                return marketItem;
            })
        );
        setNFTs(items);
        hideSpinner();
    }

    const nftsRef = useRef<null | HTMLDivElement>(null);

    return (
        <>
            <div className="container mx-auto mt-28">
                <section ref={nftsRef} className="container mx-auto mt-8 md:mt-2 scroll-mt-28">
                    <h1 className="text-4xl font-semibold text-center ">
                        <span className="text-primary">NTFs</span>
                    </h1>
                    <div className="grid grid-cols-1 gap-10 py-8 md:grid-cols-2 lg:grid-cols-3">
                        {NFTs && NFTs.length > 0 ? (
                            NFTs.map((nft: MarketItem) => <NFTBuyCard key={nft.itemId} nft={nft} />)
                        ) : (
                            <div>No NFTs in marketplace</div>
                        )}
                    </div>
                </section>
            </div>


        </>
    );
};

export default Home;
