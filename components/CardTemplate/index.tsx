import { useIDL } from "@/context/IDL";
import { checkNFT } from "@/helpers";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import JSZip from "jszip";
import Image from "next/image"
import { FC, useState } from "react";
import { Bubbles } from "../Bubbles";

const CardTemplate: FC<any> = ({ template, indexTemplate }) => {
    const { IDL } = useIDL()
    const { connection } = useConnection()
    const wallet = useAnchorWallet();
    const [hoverCard, setHover] = useState(false)
    const [download, setDownload] = useState(false)

    const exportProject = async () => {

        if (await checkNFT(connection, wallet)) {
            setDownload(true)
            const response = await fetch(`https://soda.shuttleapp.rs/get_project_files/${indexTemplate}`, {
                method: "POST",
                body: JSON.stringify({ idl: IDL })
            })
            const { files } = await response.json()
            const zip = new JSZip();

            // Iterate over each file in the response
            files.forEach((file: any) => {
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
                        className="text-chok px-5 h-min rounded-md border border-border hover:bg-inputs hover:border-2 hover:shadow-lg hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
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
                        className="text-chok px-5 h-min rounded-md border border-border hover:bg-inputs hover:border-2 hover:shadow-lg hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
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