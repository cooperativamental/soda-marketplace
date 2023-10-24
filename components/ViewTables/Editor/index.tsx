import { FC, useState } from "react";
import { Section } from "@/components/ViewTables/section";
import { useIDL } from "@/context/IDL";
import { Tooltip } from '@material-tailwind/react';
import { PopoverComponent } from "@/components/PopOver";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { contentToolTip } from "@/const/popover";

export const NewEditor: FC<any> = () => {

    const [select, setSelect] = useState("instructions")
    const { IDL, setIDL } = useIDL()
    const rederWithToolTip = (nameInstruction: string) => {
  
        return (
          <PopoverComponent
            content={contentToolTip[nameInstruction as keyof typeof contentToolTip]}
    
          >
            <InformationCircleIcon className="h-6 w-6 text-chok fill-border hover:text-green-custom cursor-pointer" />
          </PopoverComponent>
        )
      }
    return (
        <div className="flex flex-col h-[calc(100vh_-_17rem)] p-5 gap-5 font-mono">
              <Tooltip
                content="project name"
                className=" bg-border p-2"
                animate={{
                    mount: { scale: 1, y: 0, zIndex: 100 },
                    unmount: { scale: 0, y: 25, zIndex: 100 },
                }}
            >
            <input
                placeholder="project name"
                value={IDL.name}
                onChange={(e) => setIDL({
                    ...IDL,
                    name: e.target.value
                })
                }
                className="w-3/12 bg-inputs p-5 h-16 text-left text-chok text-base rounded-md hover:shadow-md hover:shadow-border hover:text-green-custom"
            />
            </Tooltip>
            <div className="flex flex-col h-full border border-border gap-2 rounded-md overflow-hidden">

                <div className="flex w-full text-center -space-x-1 h-12">
                    {
                        Object.keys(IDL).map((name, index) => {
                            if (name !== "name" && name !== "version" && name !== "metadata")
                                return (
                                    <div
                                        className={`self-end h-full w-full`}
                                        key={name}
                                    >
                                        <div
                                            className={`${select === name ? "text-chok h-full bg-backg border-b-2 border-chok" : "text-border h-[100%] hover:text-chok cursor-pointer shadow-inner shadow-inputs bg-backg border-b-2 border-border"} shadow-inputs flex px-6 items-center justify-center`}

                                            onClick={() => setSelect(name)}
                                        >
                                            <div className="flex gap-2">
                                            <p>
                                                {name}
                                            </p>
                                            {rederWithToolTip(name)}
                                            </div>
                                        </div>
                                    </div>
                                )
                        })
                    }
                </div>
                <Section instruction={select} />
            </div>
        </div>
    )
};
