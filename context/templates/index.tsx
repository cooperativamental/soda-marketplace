import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import SeahorseIcon from "@/public/seahorse.png"
import AnchorImg from "@/public/anchor.png"
import SolanaFundationIcon from "@/public/solanafundation.png"
import SolanaIcon from "@/public/SolanaIcon.png"
import PopUp from "@/components/PopUp";
import CardTemplate from "@/components/CardTemplate";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

const TemplateContext = createContext<any>({
    templates: [],
    handlerPopUp: () => { },
    popUpTemplates: false
});

const TemplatesProvider = ({ children }: { children: ReactNode }) => {
    const [popUpTemplates, setPopUpTemplates] = useState(false)
    const [templates, setTemplates] = useState([]);
    const { connection } = useConnection()
    const { wallet } = useWallet()

    useEffect(() => {
        const options = { method: 'GET' };
        fetch('https://soda.shuttleapp.rs/templates', options)
            .then(response => response.json())
            .then(response => setTemplates(response.templates))
            .catch(err => console.error(err));
    }, [])

    console.log(connection)

    return (
        <TemplateContext.Provider value={{ templates, handlerPopUpTemplate: () => { setPopUpTemplates(!popUpTemplates) }, popUpTemplates }}>
            {
                popUpTemplates &&
                <PopUp title="Templates" templates={templates} icon={"/solana.svg"} iconClassName={"h-5 w-32"} closePopUp={() => setPopUpTemplates(false)} >
                    <div className="flex flex-col w-[40rem] justify-between overflow-y-auto">
                        <div className=" flex flex-wrap p-4 gap-4 w-52 rounded-3xl border-border mini-scrollbar">
                            {
                                (!connection || !wallet) ?
                                    <WalletMultiButton style={{
                                        display: "flex",
                                        border: "solid 1px #334155",
                                        borderRadius: "1.5rem",
                                        height: "15rem",
                                        width: "10rem",
                                        alignSelf: "center",
                                        boxShadow: "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important"
                                    }}
                                    />
                                    :
                                    <div className="!flex-col h-60 !border !border-border !p-5 !w-52 !shadow-md !shadow-black  !text-chok !text-center !gap-3 !items-center !cursor-pointer !hover:bg-inputs hover:!bg-slate-700 !rounded-3xl !font-thin">
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
                </PopUp>
            }
            {children}
        </TemplateContext.Provider>
    );
};

const useTemplates = () => useContext(TemplateContext);

export { TemplatesProvider, useTemplates };