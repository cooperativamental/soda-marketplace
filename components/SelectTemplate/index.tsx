import ArrowBack from "@/public/ArrowBack.png"
import SolanaIcon from "@/public/SolanaIcon.png"

import Image from "next/image";
import { useRouter } from "next/router";
import { useTemplates } from "@/context/templates";
import CardTemplate from "./CardTemplate";
import { FC } from "react";


const SelectTemplate: FC<any> = ({ templates, closePopUp }) => {
    const router = useRouter()

    return (
        <div className="fixed z-50  h-screen w-full flex items-center justify-center backdrop-blur-sm bg-white/30 ">
            <div className=" h-[70%] w-11/12 flex flex-col gap-10 overflow-auto rounded-3xl bg-[#242f34] [&::-webkit-scrollbar]:hidden">
                <div className="flex bg-[#0c1f3f] p-3 justify-between gap-2 w-full items-center">
                    <Image src={ArrowBack} alt="back all project" className="w-4 h-4" onClick={closePopUp} />

                    <div className="flex text-white gap-4 font-semibold w-full items-center overflow-hidden">
                        Templates
                    </div>
                    <Image className="w-6 h-6" src={SolanaIcon} alt="back all project" />
                </div>
                <div className="p-4">
                    {
                        templates.map((template: any, i: number) => {
                            return (
                                <CardTemplate key={template.name} template={template} indexTemplate={i} />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default SelectTemplate
