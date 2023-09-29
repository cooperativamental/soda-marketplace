import { FC, useState, useEffect } from "react";
import { NewItem } from "../NewItem";
import { Card } from "../card";
import EditItem from "../EditItem";
import { useIDL } from "@/context/IDL";
import { Tooltip, Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { PopoverComponent } from "@/components/PopOver";

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
  }, [clear])
  const rederWithToolTip = (nameInstruction: string) => {
    const contentToolTip = {
      instructions: "Instructions (or Methods): These are the actual functions or methods that can be called on the Solana program. Each method will have a name and a list of arguments it accepts. This part tells the client-side how to correctly call the function on-chain. A client can include one or multiple instructions in a transaction. An instruction may contain one or more cross-program invocations. Each instruction in the IDL will typically have: A name, defining the method's identifier. Arguments, which detail the expected input parameters for the function. This can include both simple data types and complex custom types defined elsewhere in the IDL. Accounts, indicating which Solana accounts the instruction expects to interact with and the roles or permissions required for each. Possible events or errors that can be emitted or returned upon the instruction's execution.",
      accounts: "In Solana, accounts are more than just token balances; they are flexible storage structures associated with specific programs and can hold arbitrary state data. In your IDL, you'll define which accounts an instruction expects, detailing their roles and attributes. This specification streamlines client interactions, ensuring they provide the necessary accounts with the correct attributes for each instruction. Think of accounts in your IDL as the external interfaces or connectors that your program's functions need to operate efficiently. Data accounts that store information and manage the state of the network. There are two types of data accounts: System-owned accounts [example: A User Wallet] and Program-derived accounts (aka PDAs) [example: A User's Token Account] Program accounts that hold executable code. These accounts are stateless (meaning data passes through them but does not update them). Account Attributes in IDL: Name: A descriptive identifier for the account. isMut: A boolean indicating if the account data can be modified (mutable) during the instruction. isSigner: A boolean that signifies if the account is required to sign the transaction. isOptional: (If applicable) Indicates if the account is optional for the instruction.",
      types: "Types play an instrumental role in defining and describing the custom data structures your program uses. These types are paramount for understanding how data is organized, interpreted, and transmitted between a client and a Solana program. Basic Data Types: u8, u16, u32, u64: Unsigned integers of 8, 16, 32, or 64 bits, respectively. i8, i16, i32, i64: Signed integers of 8, 16, 32, or 64 bits, respectively. bool: Boolean data type, representing true or false. byte: A single byte of data. Custom Data Structures: You can define custom data structures (usually structs) in your IDL to represent more complex data. These structures can include multiple fields, each with its own type.",
      events: "Events are custom-defined structures that represent significant occurrences in a program. When a particular action or set of conditions is met, a program can emit an event to log that occurrence. Clients and services can then monitor for these events to trigger specific actions or updates off-chain. Within the IDL, events serve as a blueprint for the kind of log data a program can emit. By defining events, developers offer a clear schema of what external systems should look for and how to interpret the emitted data. Each event will have: Name: A descriptive identifier for the event. Fields: These describe the data associated with the event. Each field has a name and a type, indicating the kind of information carried by the event.",
      errors: "In Solana IDL, errors provide a standardized mechanism to describe possible issues or exceptions that might occur during the execution of a program. By explicitly defining errors, developers give clients a roadmap for understanding and handling potential problems. Errors in Solana IDL typically have a structured definition, including: Name: A unique identifier for the error. Code: A numerical code associated with the error, allowing for easy identification. Description: (Optional) A descriptive message or detail about the error."
    }
    return (
      <PopoverComponent
        content={contentToolTip[nameInstruction as keyof typeof contentToolTip]}

      >
        <InformationCircleIcon className="h-6 w-6 text-chok fill-border hover:text-green-custom cursor-pointer" />
      </PopoverComponent>
    )

    // <Tooltip
    //   content={contentToolTip[nameInstruction as keyof typeof contentToolTip]}
    //   className=" bg-border p-2"
    //   placement="right-end"
    //   animate={{
    //     mount: { scale: 1, y: 0, zIndex: 100 },
    //     unmount: { scale: 0, y: 25, zIndex: 100 },
    //   }}
    // >
    //   <InformationCircleIcon className="h-4 w-4 fill-border text-chok hover:text-chok" />
    // </Tooltip>
  }
  return (
    <section className={`flex p-5 m-5 border border-border bg-backg rounded-md relative`}>
      <div
        className="absolute gap-2 flex left-5 top-0 transform -translate-y-1/2 text-chok justify-center items-center font-mono font-thin"
      >
        {instruction.charAt(0).toUpperCase() + instruction.slice(1)}
        {rederWithToolTip(instruction)}
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
