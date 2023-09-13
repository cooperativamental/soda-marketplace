import { useState } from "react";
import { NewEditor } from "@/components/ViewTables/Editor";
import ClassicEditor from "@/components/ViewCards/Editor";
import JSONEditor from "@/components/JSONEditor";
import { ArrowDownTrayIcon, PlusIcon } from '@heroicons/react/24/solid';
import { CodeBracketIcon } from "@heroicons/react/24/solid";
import { useIDL } from "@/context/IDL";
import { saveIDLFile } from "@/helpers";
import { Tooltip } from "@material-tailwind/react";

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
            {view[selectedUI as keyof typeof render]}
          </div>
          <div className={`${widthJson ? "w-6/12" : "w-0"} ${hiddenJson ? "hidden" : ""} transition-[width] ease-in-out duration-700 border border-border rounded-l-lg`}>
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
            className=" bg-black p-2"
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
            className=" bg-black p-2"
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
        </div>
        <div className="flex items-center text-border gap-1">
          <p className="text-border">view:</p>
          <div className="flex border-1 rounded-md bg-inputs p-2">
            <button onClick={() => setSelectedUI("cards")} className={`hover:underline p-1 border-md ${selectedUI === "cards" && "underline text-chok"}`}>cards</button>
            <button onClick={() => setSelectedUI("tables")} className={`hover:underline p-1 border-md ${selectedUI === "tables" && "underline text-chok"}`}>tables</button>
            <button onClick={() => setSelectedUI("json")} className={`hover:underline p-1 border-md ${selectedUI === "json" && "underline text-chok"}`}>JSON</button>
          </div>
        </div>
      </div>
      <div className=" h-[calc(100%_-_5rem)] ">
        {render()}
      </div>
    </div>
  );
}
