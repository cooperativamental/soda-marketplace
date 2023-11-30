import { useIDL } from "@/context/IDL";
import { checkNFT, rustCliGen } from "@/helpers";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import JSZip from "jszip";
import Image from "next/image"
import { FC, useState } from "react";
import { Metaplex, bundlrStorage, walletAdapterIdentity } from "@metaplex-foundation/js";
import { useTemplates } from "@/context/templates";
import { track } from '@vercel/analytics';
import Export from "./PushGithub";

const CardTemplate: FC<any> = ({ template, indexTemplate }) => {
    const { IDL } = useIDL()
    const { handlerMint } = useTemplates()
    const { connection } = useConnection()
    const wallet = useAnchorWallet();
    const [hoverCard, setHover] = useState(false)
    const [download, setDownload] = useState(false)


    const nftURIs = [
        "https://arweave.net/bpl3VOvenShDy-4XIRFxDwBmZNCzN1zk-U8zOojiWGY",
        "https://arweave.net/ZS1RT_QpfseshEKFlQD7mpUYNoy5yR4CGYeZGDsSrlc",
        "https://arweave.net/Z_hmKkrEA0guKbzE_vlRu5CQhkvqHkKqtT5aFdppT8s",
        "https://arweave.net/O_e8Xh6mUtxE8erYy1Sgv1sH4-iRxS7QoJe3Zx9Cpjg",
        "https://arweave.net/iLpeXFr882B5R_hW4Jyn-CpzYkC45GqjjqwieMYxCKg",
        "https://arweave.net/n0QRCksg7SWk826jmaCJAPyZ8VIQ8LI7Qw_EbtjCvGs",
    ];

    const airdropToWallet = async () => {
        try {
            if (wallet) {
                const signature = await connection.requestAirdrop(
                    wallet.publicKey,
                    1000000000
                );

                const tx = await connection.confirmTransaction(signature);
                alert(`Airdrop sent to ${wallet.publicKey}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const mintNFT = async (indexNFT: number) => {

        if (!wallet) {
            return;
        }

        airdropToWallet()
        const rpcUrl = "https://api.devnet.solana.com";
        const metaplex = Metaplex.make(connection)
            .use(walletAdapterIdentity(wallet))
            .use(bundlrStorage({
                address: 'https://devnet.bundlr.network',
                providerUrl: rpcUrl,
                timeout: 60000,
            }));

        const uri = nftURIs[indexNFT];
        const names = ["Anchor", "Flutter", "React Native", "Seahorse", "Nextjs", "Rust CLI"]
        const { nft } = await metaplex.nfts().create({
            uri,
            name: `Soda ${names[indexNFT]}`,
            sellerFeeBasisPoints: 500, // Represents 5.00%.
        });

        handlerMint()

    };

    return (
        <div
            className="flex flex-col items-center gap-4 h-min"
            onMouseOver={() => { setHover(true) }}
            onMouseOut={() => { setHover(false) }}
        >
            <div
                className={`relative h-96 w-44 flex justify-center ${download && "animate-[rotateCan_2s_ease-in-out]"}`}
            >
                <Image
                    className={`absolute h-full w-full ${hoverCard ? "blur-lg" : ""} transition-all duration-200 ${download ? "fixed z-50 !blur-none" : ""} `}
                    unoptimized
                    src={template.image}
                    alt="can"
                    width={5}
                    height={10}
                />

                <div
                    className={`absolute flex flex-col ${hoverCard ? "" : "hidden"} h-96 p-5 w-52 rounded-3xl text-white gap-3 justify-between items-center`}
                >
                    <div className=" flex text-sm justify-between w-full">
                        <p>
                            {
                                !template?.price ?
                                    "Free Template"
                                    :
                                    `${template?.price?.toString()} ${template.currency} `
                            }
                        </p>
                        <p>v{template?.version}</p>
                    </div>
                    <div className=" flex flex-col w-full items-center justify-around">
                        <p className=" text-2xl text-center">{template.name}</p>
                        <p className=" text-xs overflow-y-auto mt-6 text-center">{template.description}</p>
                    </div>
                </div>
            </div>
            {
                template.includeWallet ?
                    <Export indexTemplate={indexTemplate} template={template} setDownload={setDownload} />
                    :
                    <button
                        className="text-chok p-4 h-min rounded-3xl border border-border hover:bg-inputs hover:border-2 hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
                        onClick={() => { track(`${template.name}-mintNFT`); mintNFT(indexTemplate) }}
                    >
                        Mint NFT


                    </button>
            }
        </div>
    )
}

export default CardTemplate