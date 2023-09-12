import { FC, useState } from 'react'

import { useIDL } from '@/context/IDL'
import { ArrowDownTrayIcon, FolderArrowDownIcon, FolderOpenIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid';
import { openIDLFile, saveIDLFile } from "@/helpers";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/router';
import { Bubbles } from '../Bubbles';

const Layout: FC<any> = ({ children }) => {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { IDL, setIDL, cleanProject } = useIDL()
    const [upload, setUpload] = useState(false)
    return (
        <div className='h-screen'>
            <div className="sticky top-0 z-40 h-24 flex items-center justify-between gap-x-6 bg-backg  shadow-sm px-6">
                <div className="flex gap-8 justify-center items-center">
                    <div className="absolute flex left-[40%] gap-8">
                        <input
                            type="file"
                            id="file"
                            onChange={(e) => {
                                setUpload(true)
                                openIDLFile(e, setIDL)
                                setTimeout(()=>{
                                    setUpload(false)
                                },3000)
                            }}
                            className="hidden"
                        />
                        <label
                            htmlFor="file"
                            className="-m-2.5 p-4 h-16 text-blue-custom text-sm inline-flex items-center gap-x-1.5 rounded-full shadow-md shadow-blue-custom border border-border bg-green-custom hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:shadow-lg active:shadow-export duration-200 cursor-pointer"
                        >
                            <FolderOpenIcon className="h-5 w-5" aria-hidden="true" /> Import IDL
                        </label>
                        {
                            router.asPath !== "/templates" ?
                                <button
                                    type="button"
                                    className="-m-2.5 p-4 h-16 text-chok text-sm inline-flex items-center gap-x-1.5 bg-export shadow-md shadow-blue-custom rounded-full border border-border hover:bg-sky hover:text-export hover:shadow-md hover:shadow-export  focus:bg-inputs active:shadow-lg active:shadow-export duration-200"
                                    onClick={() => {
                                        router.push("/templates")
                                    }}
                                >
                                    <FolderArrowDownIcon className="h-5oko w-5" aria-hidden="true" />Export project
                                </button>
                                :

                                <button
                                    type="button"
                                    className="-m-2.5 p-4 h-16 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-full border border-border hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
                                    onClick={() => {
                                        router.push("/")
                                    }}
                                >
                                    <PencilSquareIcon className="h-5oko w-5" aria-hidden="true" />IDL Generator
                                </button>
                        }

                    </div>

                </div>
                <WalletMultiButton className='!z-10 !h-full !w-max !bg-[#1e1e1e] hover:!bg-backg !rounded-full !font-thin' />
            </div>
            
            <main className=" h-[calc(100%-6rem)] mini-scroll overflow-y-auto bg-backg">
                {children}
            </main>
            {
                upload &&
                <Bubbles/>
            }
        </div>
    )
}

export default Layout