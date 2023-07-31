import { useIDL } from "@/context/IDL";
import Image from "next/image"
import { FC } from "react";

const CardTemplate: FC<any> = ({ template, indexTemplate }) => {
    const { IDL } = useIDL()

    const exportProject = () => {
        const options = {
            method: 'POST',
            body: `'{idl: ${JSON.stringify(IDL)}}'`
        };
        console.log(IDL)
        fetch(`https://soda.shuttleapp.rs/get_project_files/${indexTemplate}`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }

    return (
        <div className={` flex flex-col  bg-backg p-5 h-min w-60 rounded-3xl shadow-md shadow-black  text-white gap-6 justify-between items-center`}>
            <div className=" flex text-sm justify-between w-full">
                <p>
                    {
                        !template?.price ?
                            "Free "
                            :
                            `${template?.price?.toString()} ${template.currency} `
                    }
                    Template
                </p>
                <p>v{template?.version}</p>
            </div>
            <div className=" flex flex-col items-center">
                {
                    template.icon &&
                    < Image className="h-10 w-10" src={template.icon} alt={template.name} />
                }
                <p>{template.name}</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className=" text-xs">{template.description}</p>
                <p className=" text-sm">Brought to you by</p>
                {
                    template.icon &&
                    <div className=" flex bg-[#183a5c] justify-center items-center w-full py-2 p-4 rounded-3xl">
                        <Image className="" src={template.icon} alt={template.name} />
                    </div>
                }
            </div>
            <button
                className="text-white bg-[#387847] px-5 rounded-xl h-10"
                onClick={exportProject}
            >
                Export
            </button>
        </div>
    )
}

export default CardTemplate