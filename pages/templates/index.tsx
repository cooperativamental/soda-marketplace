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
        <div className="flex flex-col h-full justify-between overflow-y-auto">
            <h1 className="text-2xl text-white font-bold ml-5">{ IDL.name || "Edit IDL or Import IDL"}</h1>
            <div className=" flex flex-wrap p-4 gap-4  h-[70vh] rounded-3xl overflow-y-auto border-border mini-scrollbar">

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
                            <p>Got Soda?</p>
                            <p>
                                Get your can for access
                            </p>
                            <p>
                                Claim your free soda, buy standard Soda NFT or Soda Collections full access full life.
                            </p>
                        </div>
                }
                {
                    templates.map((template: any, i: number) => {
                        return (
                            <CardTemplate key={template.name} template={template} indexTemplate={i} />
                        )
                    })
                }
            </div>
            <div className="self-center text-xs text-white p-5">
                Dev a Template
            </div>
        </div>
    )
}

export default Templates