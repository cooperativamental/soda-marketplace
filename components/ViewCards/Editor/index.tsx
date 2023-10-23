import { useIDL } from "@/context/IDL"
import { FC } from "react"
import { Section } from "../section"
import { Tooltip } from '@material-tailwind/react';



const ClassicEditor: FC<any> = ({ exportData }) => {
    const { IDL, setIDL } = useIDL()

    const instructions = [
        {
            name: "instructions",
            item: IDL.instructions,
            initExpanded: true,
        },
        {
            name: "accounts",
            item: IDL.accounts,
            initExpanded: false,
        },
        {
            name: "types",
            item: IDL.types,
            initExpanded: false,

        },
        {
            name: "events",
            item: IDL.events,
            initExpanded: false,

        },
        {
            name: "errors",
            item: IDL.errors,
            initExpanded: false,
        },
    ]

    return (
        <div className="flex flex-col justify-center font-mono">
            <div className="flex justify-between">
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
                    onChange={(e) => setIDL({ ...IDL, name: e.target.value })}
                    className="p-5 mb-5 m-5 w-full md:w-3/12 h-16 bg-inputs text-chok text-base rounded-md hover:shadow-md hover:shadow-border hover:text-green-custom"
                />
                </Tooltip>
            </div>
            {
                instructions.map(({ item, name, initExpanded }) => (
                    <Section
                        key={name}
                        instruction={name}
                        content={item}
                        initExpanded={initExpanded}
                    />
                ))
            }
        </div>
    )
}

export default ClassicEditor