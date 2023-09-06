import CardTemplate from "@/components/CardTemplate"
import { Carousel } from "@/components/Carousel"
import { Loading } from "@/components/Loading"
import { useIDL } from "@/context/IDL"
import { useTemplates } from "@/context/templates"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"


const Templates = () => {
    const { IDL } = useIDL()
    const { templates } = useTemplates()
    const { wallet } = useWallet()
    const { connection } = useConnection()

    return (
        <div className="flex flex-col h-full ">
            <div className="h-20">
            <h4 className="text-md text-chok text-center font-light ml-5">Export project:</h4>
            <h1 className="text-2xl text-chok text-center font-bold ml-5">{IDL.name || "Import or create IDL"}</h1>
                
            </div>
            <div className=" flex gap-4 px-4 w-full h-[calc(100%-6rem)] rounded-3xl border-border">
                <div className="flex flex-col gap-10 w-2/12">
                    <div className="flex flex-col h-96 w-72 !border !border-border !p-5 !shadow-md !shadow-black  !text-chok !text-center !gap-3 !items-center !cursor-pointer !rounded-3xl !font-thin">
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
                    <div className="flex flex-col justify-center">
                        <p className="text-white text-xl text-center">Full Access NFT</p>
                        <Carousel />
                    </div>
                </div>
                <div className="flex flex-col w-full justify-between">
                    {
                        templates.length ?
                            <div
                                className={`grid grid-cols-4 gap-4 w-full h-full rounded-2xl overflow-y-auto border-2 p-4 mini-scrollbar`}
                            >
                                {

                                    templates.map((template: any, i: number) => {
                                        return (
                                            <CardTemplate key={template.name} template={template} indexTemplate={i} />
                                        )
                                    })
                                }
                            </div>
                            :
                            <div className=" flex justify-center items-center w-full h-full rounded-2xl overflow-y-auto border-2 p-4 mini-scrollbar">
                                <Loading />
                            </div>
                    }
                </div>
            </div>
            <div className="self-center text-xs text-white p-5">
            🌌🔧 Build templates like a pro with Soda. Craft templates that simplify the blockchain experience. Ping here 🚀🧩
            </div>
        </div>
    )
}

export default Templates