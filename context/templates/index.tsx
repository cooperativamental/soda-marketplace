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
    const [mint, setMint] = useState(true)

    useEffect(() => {
        if(mint){
            const options = { method: 'GET' };
            fetch('https://soda.shuttleapp.rs/templates', options)
                .then(response => response.json())
                .then(response => {
                    setTemplates(response.templates)
                    setMint(false)
                })
                .catch(err => console.error(err));
        }
    }, [mint])

    return (
        <TemplateContext.Provider value={{ templates, handlerPopUpTemplate: () => { setPopUpTemplates(!popUpTemplates) }, popUpTemplates, handlerMint: () => { setMint(true) } }}>
            {children}
        </TemplateContext.Provider>
    );
};

const useTemplates = () => useContext(TemplateContext);

export { TemplatesProvider, useTemplates };