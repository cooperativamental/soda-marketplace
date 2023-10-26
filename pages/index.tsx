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
import { track } from "@vercel/analytics";


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
                className="absolute hidden md:block top-2 right-0 w-12 h-12 bg-[#1e1e1e] text-chok hover:bg-inputs border-y rounded-l-2xl border-l border-border p-2 z-20 cursor-pointer hover:text-green-custom "
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
      <div className="flex-col top-0 h-24 flex gap-4 px-6">
        <div className='flex justify-center gap-2'>
          <Tooltip
            content="Create new Solana IDL. Will overwrite current IDL."
            className=" bg-border p-2"
            animate={{
              mount: { scale: 1, y: 0, zIndex: 100 },
              unmount: { scale: 0, y: 25, zzIndex: 100 },
            }}
          >
            <button
              type="button"
              className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
              onClick={() => {track('NewIDL');cleanProject()}}
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
              onClick={() => {track('DownloadIDL'); saveIDLFile(IDL)}}
            >
              <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" /> Download IDL
            </button>
          </Tooltip>

          <PopoverComponent
            content={
              <div className="p-4 z-40 ">
                <Typography color="blue-gray" className="text-green-custom mb-2 font-medium leading-tight">
                  IDL (Interface Definition Language)
                </Typography>
                <Typography variant="small" color="gray" className="text-chok mb-4 font-normal leading-snug">
                  Solana's IDL is a standardized format used for defining and documenting the interface of Solana programs (aka smart contracts) on the Solana blockchain. It allows developers to specify the structure and functions of a program in a human-readable format, making it easier for different programs to communicate and interact with each other on the Solana network.

                  Solana's IDL is a bridge between on-chain programs and off-chain systems, ensuring clear, efficient, and standardized interactions. Bridging the gap between the Rust-centric Solana world and other development environments.
                </Typography>
                <Typography variant="small" color="gray" className="text-chok mb-4 font-normal leading-snug">
                  <h5>Benefits of Solana IDL:</h5> {'\u2022'} Clear Documentation: IDL serves as a transparent and detailed documentation of the program's interface, which is beneficial not only for the original developers but also for any third party wishing to interact with the program. <br></br> {'\u2022'} Consistency Across Platforms: Since IDL is language-agnostic, it provides a consistent way for various platforms and languages to interact with the Solana program, ensuring uniformity.
                  <br></br> {'\u2022'} Error Handling: By defining potential errors in the IDL, developers give clients a roadmap to anticipate and handle potential problems, leading to better user experiences.
                  <br></br> {'\u2022'} Rapid Development: The ability to auto-generate client libraries from the IDL accelerates the development process. Instead of manually crafting client interactions, developers can leverage these libraries to save time and reduce errors.
                  <br></br> {'\u2022'} Enhanced Interoperability: With a standardized IDL, it's easier for multiple applications, platforms, and tools within the Solana ecosystem to work together seamlessly, fostering a more integrated and robust network.
                  <br></br> {'\u2022'} Trust: For end-users and developers, having a well-defined IDL can instill confidence. They can trust that the program will behave as described, and third-party platforms can trust that they're interacting with the program correctly.
                </Typography>
                <a target="_blank" rel="noopener noreferrer" href="https://www.anchor-lang.com/" className="inline-block">
                  <Button
                    size="sm"
                    variant="text"
                    className="flex items-center gap-1 capitalize text-blue-custom"
                  >
                    Anchor Framework
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

                <a href="https://solanacookbook.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button
                    size="sm"
                    variant="text"
                    className="flex items-center gap-1 capitalize text-blue-custom"
                  >
                    Read the Solana Cookbook
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
            <InformationCircleIcon className="h-6 w-6 text-border hover:text-chok cursor-pointer hidden md:block" />
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
              <button onClick={() => setSelectedUI("tables")} className={`hidden md:block hover:underline hover:bg-inputs p-2 rounded-full ${selectedUI === "tables" && "underline text-chok bg-inputs"}`}>tables</button>
              <button onClick={() => setSelectedUI("json")} className={`hover:underline hover:bg-inputs p-2 rounded-full ${selectedUI === "json" && "underline text-chok bg-inputs"}`}>JSON</button>
            </div>
          </Tooltip>
        </div>
      </div>
      {render()}
    </div>
  );
}
