import { FC, useState, useEffect } from "react";
import { NewItem } from "../NewItem";
import { Card } from "../card";
import EditItem from "../EditItem";
import { useIDL } from "@/context/IDL";
import { Tooltip, Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export const Section: FC<any> = ({ instruction, content, initExpanded = false }) => {
  const { clear } = useIDL()
  const [expanded, setExpanded] = useState(initExpanded);
  const [edit, setEdit] = useState<any>()
  const [isModalOpen, setIsModalOpen] = useState<string | boolean>(false);
  const [hidden, setHidden] = useState<any>()

  useEffect(() => {
    if (expanded) {
      return setHidden(false)
    }
    setTimeout(() => {
      setHidden(true)
    }, 500)
  }, [expanded])

  useEffect(() => {
    setEdit(false)
  },[clear])
  const rederWithToolTip = (nameInstruction: string) => {
    const contentToolTip = {
      instructions: "To execute your on chain program, you must send a transaction to it. Each transaction submitted to the Solana blockchain contains a listing of instructions (and the program's that instruction will interact with). Each instruction must include all the keys involved in the operation and the program ID we want to execute.",
      accounts: "Like files in an operating system, accounts are used to run the system, store data or state, and execute code. Data accounts that store information and manage the state of the network. There are two types of data accounts: 1 System-owned accounts [example: A User Wallet] and 2 Program-derived accounts (aka PDAs) [example: A User's Token Account]. 3 Program accounts that hold executable code. These accounts are stateless (meaning data passes through them but does not update them)",
      types: "Types",
      events: "Program Events",
      errors: "Errors"
    }
    return <Tooltip
      content={contentToolTip[nameInstruction as keyof typeof contentToolTip]}
      className=" bg-border p-2"
      placement="right-end"
      animate={{
        mount: { scale: 1, y: 0, zIndex: 100 },
        unmount: { scale: 0, y: 25, zIndex: 100 },
      }}
    >
      <InformationCircleIcon className="h-4 w-4 fill-border text-chok hover:text-chok" />
    </Tooltip>
  }
  return (
    <section className={`flex p-5 m-5 border border-border bg-backg rounded-md relative`}>
      <div
        className="absolute gap-2 flex left-5 top-0 transform -translate-y-1/2 text-chok justify-center items-center font-mono font-thin"
      >
         {instruction.charAt(0).toUpperCase() + instruction.slice(1)}
        {rederWithToolTip(instruction) }
      </div>
      <div className={`flex items-center w-full mini-scrollbar transition-all duration-500 overflow-y-hidden ${expanded ? "overflow-x-auto h-80" : " overflow-x-hidden h-0"}`}>
        {
          instruction !== "errors" && !edit ?
            <>
              <NewItem
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                prop={instruction}
              />
              {
                content.map((item: any, index: number) => (
                  <Card
                    explanationText={"add / edit"}
                    prop={instruction}
                    key={item.name}
                    item={item}
                    index={index}
                    setIsModalOpen={setIsModalOpen}
                    setEdit={setEdit}
                  />
                ))
              }
            </>
            :
            <EditItem
              expanded={expanded}
              setEdit={setEdit}
              indexItem={edit?.index}
              item={edit?.item}
              instruction={instruction}
            />
        }
      </div>
      <button
        type="button"
        className="absolute flex left-1/2 bottom-0 border border-border bg-inputs rounded-full w-8 h-8 transform -translate-x-1/2 translate-y-1/2 text-yellow-custom justify-center items-center hover:bg-backg"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {expanded ? "-" : "+"}
      </button>
    </section>
  );
};
