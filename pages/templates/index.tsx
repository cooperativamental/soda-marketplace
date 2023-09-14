import CardTemplate from "@/components/CardTemplate"
import { Loading } from "@/components/Loading"
import { useIDL } from "@/context/IDL"
import { useTemplates } from "@/context/templates"
import checkNFTaccess from "@/helpers/checkNFTaccess"
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useEffect, useState } from "react"
import Link from 'next/link'

type NFTAccess = {
    address: string,
    template: string,
}

const Templates = () => {
    const { IDL } = useIDL()
    const { templates } = useTemplates()
    const { wallet } = useWallet()
    const { connection } = useConnection()
    const anchorwallet = useAnchorWallet();
    const [ templateIncludesWallet, setTemplateIncludesWallet ] = useState<NFTAccess[]>()
    
    useEffect(() => {
        (async () => {
            const accessNFTs = await checkNFTaccess(connection, anchorwallet);
            setTemplateIncludesWallet(accessNFTs)
        })()
    }, [connection, anchorwallet])
    

    console.log("template",templateIncludesWallet)

    return (
        <div className="flex flex-col h-full ">
            <div className="h-20 ml-6 flex align-center items-center">
                <h4 className="text-md text-chok text-left font-light ml-5">Ready to export:</h4>
                <h1 className="text-2xl text-red-custom text-left font-bold ml-5">{IDL.name || "Import or create IDL"}</h1>

            </div>
            <div className=" flex gap-4 px-4 w-full h-[calc(100%-6rem)] rounded-3xl border-border">
                <div className=" flex flex-col gap-4">
                    <div className="flex flex-col h-96 w-72 !border !border-border !p-5 !shadow-md !shadow-black  !text-chok !text-left !gap-3 !items-center !rounded-3xl !font-normal">
                        {
                            (!connection || !wallet) ?
                                <WalletMultiButton
                                    style={{
                                        display: "flex",
                                        border: "solid 1px #334155",
                                        borderRadius: "1.5rem",
                                        height: "min-content",
                                        width: "100%",
                                        alignSelf: "center",
                                        boxShadow: "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important"
                                    }}

                                />
                                :
                                <div>
                                <h2 className="text-3xl font-bold leading-7 mb-4">Mint a soda can NFT for unlock export services.</h2>
                                <p className="text-lg leading-5 mb-4">
                                Each of these NFTs on your wallet grants you permission to export in that specific template. Pick one or pick them all!
                                </p>
                                <p className="text-xs"> (Free for limited time only)
                                </p>
                                </div>
                        }
                    </div>
                    <div className="flex flex-col h-96 w-72 !border !border-border !p-5 !shadow-md !shadow-black  !text-chok !text-left !gap-3 !items-left justify-center  !rounded-3xl !font-thin">
                        <div>
                        <Link href="https://github.com/Web3-Builders-Alliance/soda/tags"  target="_blank"><h5 className="font-bold hover:text-green-custom">Download Soda Desktop app.</h5></Link>
                            <p>Free for students and community courses</p>
                        </div>
                        <div>
                        <h5 className="font-bold">Soda is open-source.</h5>
                        <Link href="https://github.com/Web3-Builders-Alliance/soda/"  target="_blank"> <p className="hover:text-green-custom">Contribute here.</p></Link>
                        </div>
                        <div>
                        <Link href="https://x.com/use_soda"  target="_blank"><h5 className="font-bold hover:text-green-custom">Send us your feedback</h5></Link>
                            <p>Your experience using Soda is a valuable asset for our dev team.</p>
                        </div>
                    </div>
                </div>
                {
                    templates.length ?
                        <div
                            className={`grid grid-cols-4 gap-4 w-full h-full rounded-2xl overflow-y-auto border border-border p-4 mini-scrollbar`}
                        >
                            {

                                templates.map((template: any, i: number) => {
                                    const includeWallet = templateIncludesWallet?.find((temp) => temp.template === template.name )
                                    const addImage = { ...template, image: `/${template.name.replace(" ", "")}.png`, includeWallet: !!includeWallet }
                                    console.log(includeWallet)
                                    return (
                                        <CardTemplate key={template.name} template={addImage} indexTemplate={i} />
                                    )
                                })
                            }
                        </div>
                        :
                        <div className=" flex justify-center items-center w-10/12 h-full rounded-2xl overflow-y-auto border-2 p-4 mini-scrollbar">
                            <Loading />
                        </div>
                }
            </div>
        </div>
    )
}

export default Templates