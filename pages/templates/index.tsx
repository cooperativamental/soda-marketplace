import CardTemplate from "@/components/CardTemplate"
import { Loading } from "@/components/Loading"
import { useIDL } from "@/context/IDL"
import { useTemplates } from "@/context/templates"
import checkNFTaccess from "@/helpers/checkNFTaccess"
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useEffect, useState } from "react"

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
        (async () => {ç
            const accessNFTs = await checkNFTaccess(connection, anchorwallet);
            setTemplateIncludesWallet(accessNFTs)
        })()
    }, [connection, anchorwallet])
    

    console.log("template",templateIncludesWallet)

    return (
        <div className="flex flex-col h-full ">
            <div className="h-20">
                <h4 className="text-md text-chok text-center font-light ml-5">Export project:</h4>
                <h1 className="text-2xl text-chok text-center font-bold ml-5">{IDL.name || "Import or create IDL"}</h1>

            </div>
            <div className=" flex gap-4 px-4 w-full h-[calc(100%-6rem)] rounded-3xl border-border">
                <div className=" flex flex-col gap-4">
                    <div className="flex flex-col h-96 w-72 !border !border-border !p-5 !shadow-md !shadow-black  !text-chok !text-center !gap-3 !items-center !rounded-3xl !font-thin">
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
                                "Get a soda for your template. Use this QR to mint your sodas"
                        }
                    </div>
                    <div className="flex flex-col h-96 w-72 !border !border-border !p-5 !shadow-md !shadow-black  !text-chok !text-center !gap-3 !items-center justify-center  !rounded-3xl !font-thin">
                        🌌🔧 Build templates like a pro with Soda. Craft templates that simplify the blockchain experience. Ping here 🚀🧩
                    </div>
                </div>
                {
                    templates.length ?
                        <div
                            className={`grid grid-cols-4 gap-4 w-full h-full rounded-2xl overflow-y-auto border-2 p-4 mini-scrollbar`}
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