import { FC, useState } from 'react'

import { useIDL } from '@/context/IDL'
import { ArrowDownTrayIcon, FolderArrowDownIcon, FolderOpenIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid';
import { openIDLFile, saveIDLFile } from "@/helpers";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/router';

const Layout: FC<any> = ({ children }) => {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { IDL, setIDL, cleanProject } = useIDL()

    return (
        <div className='h-screen'>
            <div className="sticky top-0 z-40 h-24 flex items-center justify-between gap-x-6 bg-backg  shadow-sm px-6">
                <div className="flex gap-8 justify-center items-center">
                    <div className='flex flex-col gap-2'>
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
                        onClick={cleanProject}
                    >
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />New IDL
                    </button>
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
                        onClick={() => saveIDLFile(IDL)}
                    >
                        <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" /> Download IDL
                    </button>
                    </div>
                    {
                        router.asPath === "/templates" &&
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 h-16 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
                            onClick={() => {
                                router.push("/")
                            }}
                        >
                            <PencilSquareIcon className="h-5oko w-5" aria-hidden="true" />IDL Generator
                        </button>
                    }
                    <div className="absolute flex left-[40%] gap-8">
                    <input type="file" id="file" onChange={(e) => openIDLFile(e, setIDL)} className="hidden" />
                    <label
                        htmlFor="file"
                        className="-m-2.5 p-2.5 h-16 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border cursor-pointer"
                    >
                        <FolderOpenIcon className="h-5 w-5" aria-hidden="true" /> Import IDL
                    </label>
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 h-16 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
                        onClick={() => {
                            router.push("/templates")
                        }}
                    >
                        <FolderArrowDownIcon className="h-5oko w-5" aria-hidden="true" />Export project
                    </button>
                    </div>
                    <svg className="animate-spin stroke-white h-5 w-5 mr-3" viewBox="0 0 24 24">
                       
                       </svg>
                </div>
                <WalletMultiButton className='!z-10 !h-full !w-max !bg-[#FA9972] hover:!bg-slate-700 !rounded-md !font-thin' />
            </div>
            <main className=" h-[calc(100%-5rem)] mini-scroll overflow-y-auto bg-backg">
                {children}
            </main>
        </div>
    )
}

export default Layout