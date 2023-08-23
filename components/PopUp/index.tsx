import ArrowBack from "@/public/ArrowBack.png"

import Image from "next/image";
import { useRouter } from "next/router";
import { useTemplates } from "@/context/templates";
import { FC, useEffect, useRef } from "react";


const PopUp: FC<any> = ({ children, title, closePopUp, icon, iconClassName }) => {
    const popUpRef = useRef<any>()

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (popUpRef.current && !popUpRef.current.contains(event.target)) {
                console.log("close")
                closePopUp()
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popUpRef]);

    return (
        <div className="fixed z-50 top-0 left-0  h-screen w-full backdrop-blur-[.5px] bg-white/30 ">
            <div ref={popUpRef} className=" flex flex-col absolute max-w-7xl max-h-[80vh] top-10 -translate-x-1/2 left-1/2 overflow-auto rounded-3xl bg-backg [&::-webkit-scrollbar]:hidden">
                <div className="flex bg-backg p-3 justify-between gap-2 w-full items-center">
                    <Image src={ArrowBack} alt="back all project" className="w-4 h-4 cursor-pointer" onClick={closePopUp} />

                    <div className="flex text-white gap-4 font-semibold w-full items-center overflow-hidden">
                        {title}
                    </div>
                    <Image className={iconClassName} width={1} height={1} src={icon} alt="SolanaFoundation" />
                </div>
                {children}
            </div>
        </div>
    )
}

export default PopUp
