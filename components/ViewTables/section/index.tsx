import { FC, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid"
import { Card } from "../card";
import EditInstructions from "./EditInstruction";
import { useIDL } from "@/context/IDL";

export const Section: FC<any> = ({ instruction }) => {
  const { IDL, setIDL } = useIDL()
  const [newInstructionName, setNewIntructionName] = useState<string>("");
  const [editingItem, setEditingItem] = useState(0);
  
  return (
    <>
      <section className={`flex flex-col p-5 relative gap-5 h-[calc(100%_-_3.5rem)]`}>
        {
          instruction !== "errors" &&
          <div
            className=" flex bg-inputs h-14 justify-between w-80 rounded-md py-4 px-6 text-chok cursor-pointer"
          >
            <input
              placeholder={`Add ${instruction}`}
              value={newInstructionName}
              onChange={(e) => setNewIntructionName(e.target.value)}
              className=" w-full bg-inputs focus:outline-none"
            />
            <div className="flex gap-2">
              <CheckIcon
                className="w-5 text-white hover:text-green-custom"
                onClick={() => {
                  if (!IDL[instruction].find((inst: any) => inst.name === newInstructionName) && newInstructionName) {
                    setIDL({
                      ...IDL,
                      [instruction]: [
                        ...IDL[instruction],
                        { name: newInstructionName }
                      ]
                    })
                    setNewIntructionName("")
                    setEditingItem(IDL[instruction].length)
                  }
                }
                }
              />
            </div>
          </div>
        }
        <div className="flex gap-5 w-full h-full">
          {
            instruction !== "errors" &&
            <div className=" flex flex-col gap-2 h-full max-h-full w-80 pr-4 overflow-y-auto">
              {
                IDL[instruction]?.map(({ name }: { name: string; }, index: number) => {
                  return (
                    <div key={name} className={`flex items-center `}>
                      <Card
                        name={name}
                        selected={editingItem === index}
                        instruction={instruction}
                        index={index}
                        onClick={() => {
                          setEditingItem(index)
                        }}
                      />

                    </div>
                  )
                }
                )}
            </div>
          }
          <EditInstructions
            instruction={instruction}
            indexItem={editingItem}
          />
        </div>
      </section>

    </>
  );
};
