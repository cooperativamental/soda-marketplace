import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import SeahorseIcon from "@/public/seahorse.png"
import AnchorImg from "@/public/anchor.png"
import SolanaFundationIcon from "@/public/solanafundation.png"
import SelectTemplate from "@/components/SelectTemplate";

const TemplateContext = createContext<any>({
    templates: [],
    handlerPopUp: () => {},
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

    console.log(templates)

    return (
        <TemplateContext.Provider value={{ templates, handlerPopUp: () => {setPopUpTemplates(!popUpTemplates)}, popUpTemplates }}>
            {
                popUpTemplates &&
                <SelectTemplate templates={templates} closePopUp={()=>setPopUpTemplates(false)} />
            }
            {children}
        </TemplateContext.Provider>
    );
};

const useTemplates = () => useContext(TemplateContext);

export { TemplatesProvider, useTemplates };