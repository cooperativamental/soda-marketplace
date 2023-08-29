import Head from "next/head";
import { useState } from "react";
import { openIDLFile, saveIDLFile } from "@/helpers";
import { useIDL } from "@/context/IDL";
import { NewEditor } from "@/components/ViewTables/Editor";
import ClassicEditor from "@/components/ViewCards/Editor";
import {
  PlusIcon,
  FolderOpenIcon,
  ArrowDownTrayIcon,
  FolderArrowDownIcon
} from '@heroicons/react/24/outline'
import JSONEditor from "@/components/JSONEditor";
import { CodeBracketIcon } from "@heroicons/react/24/solid";
import { useTemplates } from "@/context/templates";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {

  const { IDL, setIDL, cleanProject } = useIDL()
  const { handlerPopUpTemplate } = useTemplates()
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
              className="absolute top-2 right-2 w-6 h-6 text-white z-20 cursor-pointer hover:text-green-customn "
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
    <div className='h-screen'>
      <div className="sticky top-0 h-20 flex items-center justify-between gap-x-6 bg-backg  shadow-sm px-6">
        <div className="flex items-center text-chok gap-5 ">
          <p className="text-border">select view:</p>
          <button onClick={() => setSelectedUI("cards")} className={`${selectedUI === "cards" && "text-green-custom underline"}`}>cards</button>
          <button onClick={() => setSelectedUI("tables")} className={`${selectedUI === "tables" && "text-green-custom underline"}`}>tables</button>
          <button onClick={() => setSelectedUI("json")} className={`${selectedUI === "json" && "text-green-custom underline"}`}>JSON</button>
        </div>
      </div>
      <div className=" h-[calc(100%_-_5rem)] bg-backg ">
        {render()}
      </div>
    </div>
  );
}
