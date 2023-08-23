import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import SeahorseIcon from "@/public/seahorse.png"
import AnchorImg from "@/public/anchor.png"
import SolanaFundationIcon from "@/public/solanafundation.png"
import SolanaIcon from "@/public/SolanaIcon.png"
import PopUp from "@/components/PopUp";
import CardTemplate from "@/components/CardTemplate";


const TemplateContext = createContext<any>({
    templates: [],
    handlerPopUp: () => { },
    popUpTemplates: false
});

const TemplatesProvider = ({ children }: { children: ReactNode }) => {
    const [popUpTemplates, setPopUpTemplates] = useState(false)
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const options = { method: 'GET' };
        fetch('https://soda.shuttleapp.rs/templates', options)
            .then(response => response.json())
            .then(response => setTemplates(response.templates))
            .catch(err => console.error(err));
    }, [])

    return (
        <TemplateContext.Provider value={{ templates, handlerPopUpTemplate: () => { setPopUpTemplates(!popUpTemplates) }, popUpTemplates }}>
            {
                popUpTemplates &&
                <PopUp title="Templates" templates={templates} icon={"/solana.svg"} iconClassName={"h-5 w-32"} closePopUp={() => setPopUpTemplates(false)} >
                    <div className=" flex flex-wrap p-4 gap-4 h-70 overflow-y-auto mini-scrollbar">
                        <div className={` flex flex-col h-96 border border-border p-5 w-52 rounded-3xl shadow-md shadow-black  text-chok text-center gap-3 justify-around items-center cursor-pointer hover:bg-inputs`}>
                                <p>add bubbles</p>
                                <p className=" text-2xl">
                                    dev a template
                                </p>
                                <p>
                                    and become a Contributor Partner: We have a revenue share proposal for templates builders.
                                </p>
                        </div>
                        {
                            templates.map((template: any, i: number) => {
                                return (
                                    <CardTemplate key={template.name} template={template} indexTemplate={i} />
                                )
                            })
                        }
                    </div>
                </PopUp>
            }
            {children}
        </TemplateContext.Provider>
    );
};

const useTemplates = () => useContext(TemplateContext);

export { TemplatesProvider, useTemplates };