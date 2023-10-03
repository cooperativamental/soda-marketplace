import { FC, useState } from 'react'

import { useIDL } from '@/context/IDL'
import { ArrowDownTrayIcon, FolderArrowDownIcon, FolderOpenIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid';
import { openIDLFile, saveIDLFile } from "@/helpers";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Bubbles } from '../Bubbles';
import { Tooltip } from '@material-tailwind/react';
import Image from 'next/image';

const Layout: FC<any> = ({ children }) => {
    const WalletMultiButton = dynamic(
        async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
        { ssr: false }
    );
    const router = useRouter()
    const [tooltip, setTooltip] = useState<{ type: string | false, content: string }>({
        type: false,
        content: ""
    })
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { IDL, setIDL, cleanProject } = useIDL()
    const [upload, setUpload] = useState(false)
    return (
        <div className='h-screen'>
            <div className="sticky top-0 z-40 h-24 flex items-center justify-between gap-x-6 bg-backg shadow-sm px-6">
                <div className="flex gap-8 justify-center items-center">
                    <Image className="h-20 w-20" width={5} height={2} src={"/soda.svg"} alt="soda app" />

                    <div className="absolute flex left-[40%] gap-8">
                        <input
                            type="file"
                            id="file"
                            onChange={(e) => {
                                setUpload(true)
                                openIDLFile(e, setIDL)
                                setTimeout(() => {
                                    setUpload(false)
                                }, 3000)
                            }}
                            className="hidden"
                        />
                        {
                            router.asPath === "/templates" &&
                            <Tooltip
                                content="IDL Generator"
                                className=" bg-border p-2"
                                animate={{
                                    mount: { scale: 1, y: 0, zIndex: 100 },
                                    unmount: { scale: 0, y: 25, zIndex: 100 },
                                }}
                            >
                                <button
                                    type="button"
                                    className="-m-2.5 p-4 h-16 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-full border border-border hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
                                    onClick={() => {
                                        router.push("/")
                                    }}
                                >
                                    <PencilSquareIcon className="h-5oko w-5" aria-hidden="true" />IDL Generator
                                </button>
                            </Tooltip>
                        }
                        <Tooltip
                            content="Open an IDL from your computer idl.json"
                            className=" bg-border p-2"
                            animate={{
                                mount: { scale: 1, y: 0, zIndex: 100 },
                                unmount: { scale: 0, y: 25, zIndex: 100 },
                            }}
                        >
                            <label
                                htmlFor="file"
                                className="-m-2.5 p-4 h-16 text-blue-custom text-sm inline-flex items-center gap-x-1.5 rounded-full shadow-md shadow-blue-custom border border-border text-green-custom hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:shadow-lg active:shadow-export duration-200 cursor-pointer"
                            >
                                <FolderOpenIcon className="h-5 w-5" aria-hidden="true" />
                                Import IDL
                            </label>
                        </Tooltip>
                        {
                            router.asPath !== "/templates" &&
                            <Tooltip
                                content="Export your project to multiple templates"
                                className=" bg-border p-2"
                                animate={{
                                    mount: { scale: 1, y: 0, zIndex: 100 },
                                    unmount: { scale: 0, y: 25, zIndex: 100 },
                                }}
                            >
                                <button
                                    type="button"
                                    className="-m-2.5 p-4 h-16 text-chok text-sm inline-flex items-center gap-x-1.5 bg-export shadow-md shadow-blue-custom rounded-full border border-border hover:bg-sky hover:text-export hover:shadow-md hover:shadow-export  focus:bg-inputs active:shadow-lg active:shadow-export duration-200"
                                    onClick={() => {
                                        router.push("/templates")
                                    }}
                                    onMouseOver={() => { setTooltip({ type: "EXPORT_PROJECT", content: "Export Project" }) }}
                                    onMouseOut={() => { setTooltip({ type: false, content: "" }) }}
                                >
                                    <FolderArrowDownIcon className="h-5oko w-5" aria-hidden="true" />
                                    Export project
                                </button>

                            </Tooltip>
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
                <Bubbles />
            }
        </div>
    )
}

export default Layout