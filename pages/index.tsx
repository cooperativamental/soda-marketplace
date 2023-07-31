import Head from "next/head";
import {  useState } from "react";
import { cleanProject, openIDLFile, saveIDLFile } from "@/helpers";
import { useIDL } from "@/context/IDL";
import { NewEditor } from "@/components/NewEditor/Editor";
import ClassicEditor from "@/components/ClassicEditor/Editor";
import {
  PlusIcon,
  FolderOpenIcon,
  ArrowDownTrayIcon,
  FolderArrowDownIcon
} from '@heroicons/react/24/outline'
import JSONEditor from "@/components/JSONEditor";
import { CodeBracketIcon } from "@heroicons/react/24/solid";
import { useTemplates } from "@/context/templates";

export default function Home() {

  const { IDL, setIDL } = useIDL()
  const { handlerPopUp } = useTemplates()
  const [selectedUI, setSelectedUI] = useState("cards")
  const [baseFolder, setBaseFolder] = useState<any>(undefined);
  //  const exportData = generateProjectFiles(IDL.name, templateFolder, setTemplateFolder, setBaseFolder);
  const newProject = cleanProject(setIDL);
  //  const generateIDL = saveIDLFile(setBaseFolder, IDL.version, IDL.name, IDL.instructions, IDL.accounts, IDL.types, IDL.events, IDL.errors, IDL.metadata);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [widthJson, setWidthJson] = useState(false)
  const [hiddenJson, setHiddenJson] = useState(true)

  const navigation = [
    {
      name: 'Open IDL file',
      href: '#',
      //event: openIDL
    },
    {
      name: 'New IDL',
      href: '#',
      event: newProject
    },
    {
      name: 'Save IDL',
      href: '#',
      //      event: generateIDL
    },
    {
      name: 'Select a template',
      href: '#',
      //     event: handleTemplateFolder
    },
    {
      name: 'Create Project',
      href: '#',
      //      event: exportData
    },
  ]

  const render = () => {
    const view = {
      cards: <ClassicEditor exportData={() => { }/*exportData*/} />,
      tables: <NewEditor generateIDL={() => { }/*generateIDL*/} />
    }

    if (selectedUI !== "json") {
      return (
        <div className="flex h-full ">
          <div className="h-full w-full overflow-auto">
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
              className="sticky ml-auto mr-2 top-2 w-6 h-6 text-white z-20 cursor-pointer hover:text-green-customn "
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
    <>
      <Head>
        <title>Soda</title>
        <meta name="description" content="Generate Solana projects from an UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='h-screen'>
        <div className="sticky top-0 z-40 h-20 flex items-center justify-between gap-x-6 bg-backg  shadow-sm px-6">
          <div className="flex gap-8 justify-center items-center">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
              onClick={newProject}
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />New
            </button>
            <input type="file" id="file" onChange={(e) => openIDLFile(e, IDL, setIDL)} className="hidden" />
            <label
              htmlFor="file"
              className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"

            >
              <FolderOpenIcon className="h-5 w-5" aria-hidden="true" />Open
            </label>
            <button
              type="button"
              className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
            // onClick={generateIDL}
            >
              <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />Save
            </button>
            <button
              type="button"
              className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
              onClick={handlerPopUp}
            >
              <FolderArrowDownIcon className="h-5 w-5" aria-hidden="true" />Export
            </button>
          </div>
          <div className="text-chok flex gap-5">
            <p className="text-border">Views:</p>
            <button onClick={() => setSelectedUI("cards")} className={`${selectedUI === "cards" && "text-green-custom underline"}`}>cards</button>
            <button onClick={() => setSelectedUI("tables")} className={`${selectedUI === "tables" && "text-green-custom underline"}`}>tables</button>
            <button onClick={() => setSelectedUI("json")} className={`${selectedUI === "json" && "text-green-custom underline"}`}>JSON</button>

          </div>
        </div>
        <main className=" h-[calc(100%_-_5rem)] bg-backg ">
          {render()}
        </main>
      </div>

    </>
  );
}
