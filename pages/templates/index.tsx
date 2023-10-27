import CardTemplate from "@/components/CardTemplate"
import { Loading } from "@/components/Loading"
import { useIDL } from "@/context/IDL"
import { useTemplates } from "@/context/templates"
import checkNFTaccess from "@/helpers/checkNFTaccess"
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react"
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react"
import Link from 'next/link'
import { track } from "@vercel/analytics"

type NFTAccess = {
    address: string,
    template: string,
}

const WalletMultiButton = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);
const Templates = () => {
    const { IDL } = useIDL()
    const { templates } = useTemplates()
    const { wallet } = useWallet()
    const { connection } = useConnection()
    const anchorwallet = useAnchorWallet();
    const [templateIncludesWallet, setTemplateIncludesWallet] = useState<NFTAccess[]>()
    const [renderButtonWallet, setRenderButtonWallet] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            const accessNFTs = await checkNFTaccess(connection, anchorwallet);
            setTemplateIncludesWallet(accessNFTs)
        })()
    }, [connection, anchorwallet, templates])


    useEffect(() => {
        setRenderButtonWallet(!connection || !wallet)
    }, [connection, wallet])

    console.log(wallet)

    return (
        <div className="flex flex-col h-full gap-4 overflow-y-auto">
            <div className="h-20 ml-6 flex align-center items-center">
                <h4 className="text-md text-chok text-left font-light ml-5">Export project:</h4>
                <h1 className="text-2xl text-red-custom text-left font-bold ml-5">{IDL.name || "Import or create IDL"}</h1>

            </div>
            <div className=" grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-4 px-4 w-full rounded-3xl  border-border">
                <div className=" col-start-1 md:col-end-2 md:row-start-1 md:row-end-2 flex flex-col h-76 w-full md:w-72 !border !border-border !p-5 !shadow-md !shadow-black  !text-chok !text-left !gap-3 self-center !rounded-3xl !font-normal">

                    <WalletMultiButton
                        style={{
                            display: renderButtonWallet ? "block" : "none",
                            border: "solid 1px #334155",
                            borderRadius: "1.5rem",
                            height: "min-content",
                            width: "100%",
                            alignSelf: "center",
                            boxShadow: "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important"
                        }}

                    />
                    <div className={renderButtonWallet ? "hidden" : "block"}>
                        <h2 className="text-3xl font-bold leading-7 mb-4">Mint a soda can NFT for unlock export services.</h2>
                        <p className="text-lg leading-5 mb-4">
                            Each of these NFTs on your wallet grants you permission to export in that specific template. Pick one or pick them all!
                        </p>
                        <p className="text-green-custom"> Set your wallet on Solana Devnet
                        </p>
                    </div>


                </div>
                <div className="md:col-start-1 md:col-end-2 row-start-3 md:row-start-2 md:row-end-3 flex flex-col h-76 w-full md:w-72 !border !border-border !p-5 !shadow-md !shadow-black  !text-chok !text-left !gap-3  self-center !rounded-3xl !font-thin">
                    <div onClick={() => track("deskApp")}>
                        <Link href="https://github.com/Web3-Builders-Alliance/soda/tags" target="_blank"><h5 className="font-bold hover:text-green-custom">
                            🖥️  Download Soda Desktop app </h5></Link>
                        <p>Free for students and community courses</p>
                    </div>
                    <div onClick={() => track("contribute")}>
                        <h5 className="font-bold">🥤 Soda is open-source.</h5>
                        <Link href="https://github.com/Web3-Builders-Alliance/soda/" target="_blank"> <p className="hover:text-green-custom">Contribute here.</p></Link>
                    </div>
                    <div onClick={() => track("feedback")}>
                        <Link href="https://x.com/use_soda" target="_blank"><h5 className="font-bold hover:text-green-custom">🚀 Send us your feedback</h5></Link>
                        <p>Your experience using Soda is a valuable asset for our dev team.</p>
                    </div>
                </div>
                <div className="md:col-start-1 md:col-end-2 row-start-4 md:row-start-3 md:row-end-4 flex flex-col h-76 w-full md:w-72 !border !border-border !p-5 !shadow-md !shadow-black  !text-chok !text-left !gap-3 self-center justify-center  !rounded-3xl !font-thin">
                    <div onClick={() => track("exchange")}>
                        <Link href="https://solana.stackexchange.com/" target="_blank"><h5 className="font-bold hover:text-green-custom">🤔 Questions?</h5>
                            <p>solana.stackexchange.com</p>
                        </Link>
                    </div>
                    <div onClick={() => track("cookbook")}>
                        <Link href="https://solanacookbook.com/" target="_blank"><h5 className="font-bold hover:text-green-custom">📖 Solana Cookbook</h5></Link>
                        <p>Read the Solana Cookbook</p>
                    </div>
                    <div onClick={() => track("solanaTools")}>
                        <Link href="https://github.com/solana-developers/solana-tools" target="_blank"><h5 className="font-bold hover:text-green-custom">🦀  Solana Tools 🪓</h5></Link>
                        <p>List of all Solana dev tools </p>
                    </div>
                </div>
                {
                    templates.length ?
                        <div
                            className={`col-start-1 col-end-2 row-start-2 md:col-start-2 md:col-end-3  md:row-start-1 md:row-end-4 max-h-[40rem] flex flex-wrap justify-around gap-4 w-full rounded-2xl overflow-y-auto border border-border p-4 mini-scrollbar`}
                        >
                            {

                                templates.map((template: any, i: number) => {
                                    const includeWallet = templateIncludesWallet?.find((temp) => temp.template === template.name)
                                    const addImage = { ...template, image: `/${i}.png`, includeWallet: !!includeWallet }

                                    return (
                                        <CardTemplate key={template.name} template={addImage} indexTemplate={i} />
                                    )
                                })
                            }
                            <CardTemplate key={"Rust CLI"} template={{ name: "Rust CLI", image: "/rust.png", description: "Rust CLI template", price: 0, currency: "SOL", version: "0.1.0", includeWallet: true }} indexTemplate={5} />
                        </div>
                        :
                        <div className="flex justify-center items-center w-10/12 h-full rounded-2xl overflow-y-auto border-2 p-4 mini-scrollbar">
                            <Loading />
                        </div>
                }
            </div>
        </div >
    )
}

export default Templates