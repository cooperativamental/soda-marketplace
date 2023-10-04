import { useIDL } from "@/context/IDL";
import { checkNFT } from "@/helpers";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import JSZip from "jszip";
import Image from "next/image"
import { FC, useState } from "react";
import { Metaplex, keypairIdentity, bundlrStorage, token, walletAdapterIdentity } from "@metaplex-foundation/js";
import { Keypair } from "@solana/web3.js";

const CardTemplate: FC<any> = ({ template, indexTemplate }) => {
    const { IDL } = useIDL()
    const { connection } = useConnection()
    const wallet = useAnchorWallet();
    const [hoverCard, setHover] = useState(false)
    const [download, setDownload] = useState(false)
    

    const nftURIs = [
        "https://arweave.net/g1hS1TWH5YWV7Ea-PRpMFJuwQSFoM9inefPuz418v7I",
        "https://arweave.net/FBvO_Aia5u2uKw-6QB8-FPuJ1PlKyqCfdOKoK1eyEIQ",
        "https://arweave.net/Wfs_Fz19e3Mio1WZ8_Et38m3kgvl2DwOcctRcN9Pvic",
        "https://arweave.net/CzkIJCMfj479tmv2PBV7HF2vKB2ReThlm1R8Xv9vb6o",
    ];

    const mintNFT = async (indexNFT: number) => {

        const keyData = JSON.parse("[48,111,2,213,165,203,156,74,16,34,244,70,8,229,76,66,45,112,21,100,71,142,124,119,105,103,113,11,212,1,183,3,169,232,178,149,10,149,75,161,14,96,250,199,85,201,37,249,63,213,90,154,130,32,85,43,45,26,25,202,45,143,7,122]");
        if (!wallet) {
            return;
        }
        const sodaWallet = await Keypair.fromSecretKey(Buffer.from(keyData, 'base64'));
        //const otherwallet = Keypair.generate();
        const rpcUrl = "https://api.devnet.solana.com";
        const metaplex = Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))
        .use(bundlrStorage({
            address: 'https://devnet.bundlr.network',
            providerUrl: rpcUrl,
            timeout: 60000,
        }));

        
        
        /*const { uri } = await metaplex.nfts().uploadMetadata({
            name: "Soda NFT",
            description: "Soda NFT",
            image: "https://arweave.net/AQDjfAP1e6mXeKTP10l_b7iyRb8sfbpODS3zsKRcRF8?ext=png",
        });
        console.log(uri);*/
        const uri = nftURIs[indexNFT];
        const names = ["Anchor-NextJS", "Flutter", "React Native", "Seahorse"]
        const { nft } = await metaplex.nfts().create({
            uri,
            name: `Soda ${names[indexNFT]} NFT`,
            sellerFeeBasisPoints: 500, // Represents 5.00%.
        });
        console.log(nft);

        const txBuilder = metaplex.nfts().builders().transfer({
            nftOrSft: nft,
            fromOwner: sodaWallet.publicKey,
            toOwner: wallet?.publicKey ?? sodaWallet.publicKey,
            amount: token(1),
            authority: sodaWallet,
        });

        console.log(txBuilder);

        const blockhash = await connection.getLatestBlockhash();
        txBuilder.toTransaction(blockhash).sign(sodaWallet);

        // Submit the transaction to the Solana network.
        //const txHash = await connection.sendTransaction(txBuilder);

        //console.log("Transaction submitted: ", txHash);

        
};


    const exportProject = async () => {

        if (await checkNFT(connection, wallet)) {
            setDownload(true)
            const response = await fetch(`https://soda.shuttleapp.rs/get_project_files/${indexTemplate}`, {
                method: "POST",
                body: JSON.stringify({ idl: IDL })
            }).then((res) => { return res.json() })

            const { files } = response
            const zip = new JSZip();

            // Iterate over each file in the response
            files.Ok.forEach((file: any) => {
                const { path, content } = file;

                // Create folders and file in memory
                const folders = path.split('/');
                const fileName = folders.pop();

                let folder = zip;
                folders.forEach((folderName: any) => {
                    folder = folder.folder(folderName) as JSZip
                });

                // Set the content of the file
                if (typeof content.String != "undefined") {
                    folder.file(fileName, content.String);
                } else {
                    folder.file(fileName, content.Vec)
                }
            });

            // Generate the zip file asynchronously
            zip.generateAsync({ type: 'blob' }).then(blob => {
                // Provide a way for the user to download the zip file
                const url = URL.createObjectURL(blob);
                // Example: Create a download link and trigger the click event
                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                downloadLink.download = `${IDL.name || " "}.zip`;
                downloadLink.click();

                // Clean up the created URL object
                URL.revokeObjectURL(url);
            });

            setTimeout(() => {
                setDownload(false)
            }, 2000)
        } else {
            alert("need to be coneected with a wallet with the Soda NFT")
        }
    }

    return (
        <div
            className="flex flex-col items-center gap-4 h-min"
            onMouseOver={() => { setHover(true) }}
            onMouseOut={() => { setHover(false) }}
        >
            <div
                className={`relative h-96 w-52 flex justify-center  ${download && "animate-[rotateCan_2s_ease-in-out]"}`}
            >
                <Image
                    className={`absolute h-full w-full ${hoverCard ? "blur-sm" : ""} transition-all duration-200 ${download ? "fixed z-50 !blur-none" : ""} `}
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

                    <button
                        className="text-chok p-4 h-min rounded-3xl border border-border hover:bg-inputs hover:border-2 hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
                        onClick={exportProject}
                    >
                        {
                            hoverCard && !download ?
                                "Export"

                                :
                                template.name
                        }
                    </button>
                    :
                    <button
                        className="text-chok p-4 h-min rounded-3xl border border-border hover:bg-inputs hover:border-2 hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
                        onClick={()=>mintNFT(indexTemplate)}
                    >
                        {
                            hoverCard ?
                                "Mint NFT"

                                :
                                template.name
                        }

                    </button>
            }
        </div>
    )
}

export default CardTemplate