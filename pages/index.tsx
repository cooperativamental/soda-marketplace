import { useState } from "react";
import { NewEditor } from "@/components/ViewTables/Editor";
import ClassicEditor from "@/components/ViewCards/Editor";
import JSONEditor from "@/components/JSONEditor";
import { ArrowDownTrayIcon, PlusIcon } from '@heroicons/react/24/solid';
import { CodeBracketIcon } from "@heroicons/react/24/solid";
import { useIDL } from "@/context/IDL";
import { saveIDLFile } from "@/helpers";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { PopoverComponent } from "@/components/PopOver";

export default function Home() {
  const { IDL, cleanProject } = useIDL()
  const [selectedUI, setSelectedUI] = useState("cards")
  const [widthJson, setWidthJson] = useState(false)
  const [hiddenJson, setHiddenJson] = useState(true)

  const render = () => {
    const view = {
      cards: <ClassicEditor />,
      tables: <NewEditor />
    }

    if (selectedUI !== "json") {
      return (
        <div className="flex h-full ">
          <div className="relative h-full w-full overflow-auto">
            <Tooltip
              content="open/close JSON viewer"
              className="bg-border p-2"
              animate={{
                mount: { scale: 1, y: 0, zIndex: 100 },
                unmount: { scale: 1, y: 25, zIndex: 100 },
              }}
            >
              <CodeBracketIcon
                onClick={() => {
                  if (widthJson) {
                    setWidthJson(false)
                    setTimeout(() => {
                      setHiddenJson(true)
                    }, 450)
                  } else {
                    setHiddenJson(false)
                    setTimeout(() => {
                      setWidthJson(true)
                    }, 0)

                  }
                }}
                className="absolute top-2 right-0 w-12 h-12 bg-[#1e1e1e] text-chok hover:bg-inputs border-y rounded-l-2xl border-l border-border p-2 z-20 cursor-pointer hover:text-green-custom "
              />
            </Tooltip>
            {view[selectedUI as keyof typeof render]}
          </div>

          <div className={`${widthJson ? "w-6/12" : "w-0"} ${hiddenJson ? "hidden" : ""} transition-[width] ease-in-out duration-700 bg-[#1e1e1e] border border-border rounded-l-lg`}>
            <JSONEditor noeditable />
          </div>
        </div>
      )
    } else {
      return <JSONEditor />
    }
  }

  return (
    <div className='h-full flex flex-col gap-2'>
      <div className="sticky flex-col top-0 h-20 flex gap-4 px-6">
        <div className='flex gap-2'>
          <Tooltip
            content="Create new Solana IDL. Will overwrite data on actual screen"
            className=" bg-border p-2"
            animate={{
              mount: { scale: 1, y: 0, zIndex: 100 },
              unmount: { scale: 0, y: 25, zzIndex: 100 },
            }}
          >
            <button
              type="button"
              className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
              onClick={cleanProject}
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />New IDL
            </button>
          </Tooltip>
          <Tooltip
            content="Download IDL as JSON file proyectname.json"
            className=" bg-border p-2"
            animate={{
              mount: { scale: 1, y: 0, zIndex: 100 },
              unmount: { scale: 0, y: 25, zIndex: 100 },
            }}
          >
            <button
              type="button"
              className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
              onClick={() => saveIDLFile(IDL)}
            >
              <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" /> Download IDL
            </button>
          </Tooltip>

          <PopoverComponent
            content={
              <div className="p-4">
                <Typography color="blue-gray" className="text-green-custom mb-2 font-medium leading-tight">
                Solana's IDL (Interface Definition Language) is a tool for defining and documenting the interface of smart contracts on the Solana blockchain.
                </Typography>
                <Typography variant="small" color="gray" className="text-chok mb-4 font-normal leading-snug">
                    It allows developers to specify the structure and functions of a program in a human-readable format, making it easier for different programs to communicate and interact with each other on the Solana network. IDL plays a crucial role in enabling the seamless integration of decentralized applications and services within the Solana ecosystem, promoting interoperability and fostering innovation within the blockchain space.
                    The Solana IDL provides a standardized, language-agnostic way to represent the interface of on-chain Solana programs, bridging the gap between the Rust-centric Solana world and other development environments.       
                </Typography>
                <a href="https://www.quicknode.com/guides/solana-development/anchor/what-is-an-idl" className="inline-block">
                  <Button
                    size="sm"
                    variant="text"
                    className="flex items-center gap-1 capitalize text-blue-custom"
                  >
                    Read More
                    <svg
                      xmlns=""
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-3.5 w-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </a>
              </div>
            }
          >
            <InformationCircleIcon className="h-6 w-6 text-border hover:text-chok cursor-pointer" />
          </PopoverComponent>

        </div>

        <div className="flex items-center text-border gap-1">
          <Tooltip
            content="Select the view you like best"
            className=" bg-border p-2"
            animate={{
              mount: { scale: 1, y: 0, zIndex: 100 },
              unmount: { scale: 0, y: 25, zIndex: 100 },
            }}
          >
            <div className="flex border-1 p-2">
              <button onClick={() => setSelectedUI("cards")} className={`hover:underline hover:bg-inputs p-2 rounded-full ${selectedUI === "cards" && "underline text-chok bg-inputs"}`}>cards</button>
              <button onClick={() => setSelectedUI("tables")} className={`hover:underline hover:bg-inputs p-2 rounded-full ${selectedUI === "tables" && "underline text-chok bg-inputs"}`}>tables</button>
              <button onClick={() => setSelectedUI("json")} className={`hover:underline hover:bg-inputs p-2 rounded-full ${selectedUI === "json" && "underline text-chok bg-inputs"}`}>JSON</button>
            </div>
          </Tooltip>
        </div>
      </div>
      <div className=" h-[calc(100%_-_5rem)] ">
        {render()}
      </div>
    </div>
  );
}
