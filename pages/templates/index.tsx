import CardTemplate from "@/components/CardTemplate"
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
            <h1 className="text-2xl text-white font-bold ml-5">{IDL.name || "Edit IDL or Import IDL"}</h1>
            <div className=" flex gap-4 px-4 w-full h-[calc(100%-6rem)] rounded-3xl border-border">

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
                            "QR"
                    }
                </div>
                <div className="flex flex-col w-full justify-between">
                    <div
                        className={`grid grid-cols-4 gap-4 ${!templates.length ? "!flex items-center justify-center w-full" : "" } w-full h-[48%] rounded-t-2xl overflow-y-auto border-2 p-4 mini-scrollbar`}
                    >
                        {
                            templates.length ?
                                templates.map((template: any, i: number) => {
                                    return (
                                        <CardTemplate key={template.name} template={template} indexTemplate={i} />
                                    )
                                })
                                :
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                        }
                    </div>
                    <div
                        className={`grid grid-cols-4 gap-4 ${!templates.length ? "!flex items-center justify-center w-full" : "" } w-full h-[48%] rounded-b-2xl overflow-y-auto border-2 p-4 mini-scrollbar`}
                        >
                        {
                            templates.length ?
                                templates.map((template: any, i: number) => {
                                    return (
                                        <CardTemplate key={template.name} template={template} indexTemplate={i} />
                                    )
                                })
                                :
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                        }
                    </div>
                </div>
            </div>
            <div className="self-center text-xs text-white p-5">
                Dev a Template
            </div>
        </div>
    )
}

export default Templates