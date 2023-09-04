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
            <h1 className="text-2xl text-white font-bold ml-5">{ IDL.name || "Edit IDL or Import IDL"}</h1>
            <div className=" flex gap-4 px-4 w-full h-[calc(100%-6rem)] rounded-3xl border-border">

                {
                    (!connection || !wallet) ?
                        <WalletMultiButton style={{
                            display: "flex",
                            border: "solid 1px #334155",
                            borderRadius: "1.5rem",
                            height: "24rem",
                            width: "10rem",
                            alignSelf: "center",
                            boxShadow: "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important"
                        }}
                        />
                        :
                        <div className="!flex-col h-96 !border !border-border !p-5 !w-52 !shadow-md !shadow-black  !text-chok !text-center !gap-3 !items-center !cursor-pointer !hover:bg-inputs hover:!bg-slate-700 !rounded-3xl !font-thin">
                            QR
                        </div>
                }
                <div className="flex flex-col w-full justify-between">
                    <div
                        className="grid grid-cols-4 gap-4 w-full h-[48%] rounded-t-2xl overflow-y-auto border-2 p-4 mini-scrollbar"
                    >
                        {
                            templates.map((template: any, i: number) => {
                            return (
                                    <CardTemplate key={template.name} template={template} indexTemplate={i} />
                                )
                            })
                        }
                    </div>
                    <div
                        className="grid grid-cols-4 gap-4 w-full h-[48%] rounded-b-2xl overflow-y-auto border-2 p-4 mini-scrollbar"
                    >
                        {
                            [...templates, ...templates, ...templates].map((template: any, i: number) => {
                                return (
                                    <CardTemplate key={template.name} template={template} indexTemplate={i} />
                                )
                            })
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