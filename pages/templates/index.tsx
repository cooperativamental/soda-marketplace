import CardTemplate from "@/components/CardTemplate"
import { Carousel } from "@/components/Carousel"
import { Loading } from "@/components/Loading"
import { useIDL } from "@/context/IDL"
import { useTemplates } from "@/context/templates"
import checkNFTaccess from "@/helpers/checkNFTaccess"
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { FC, useEffect, useState } from "react"
import cloudinary from 'cloudinary';

type NFTAccess = {
    address: string,
    template: string,
}
const Templates: FC<any> = ({ images }) => {
    const { IDL } = useIDL()
    const { templates } = useTemplates()
    const { wallet } = useWallet()
    const { connection } = useConnection()
    const [canCollection, setCanCollection] = useState()
    const anchorwallet = useAnchorWallet();
    const [templateIncludesWallet, setTemplateIncludesWallet] = useState<NFTAccess[]>()

    useEffect(() => {
        (async () => {
            const accessNFTs = await checkNFTaccess(connection, anchorwallet);
            setTemplateIncludesWallet(accessNFTs)
        })()
    }, [connection, anchorwallet])


    console.log("template", templateIncludesWallet)

    return (
        <div className="flex flex-col h-full ">
            <div className="h-20">
                <h4 className="text-md text-chok text-center font-light ml-5">Export project:</h4>
                <h1 className="text-2xl text-chok text-center font-bold ml-5">{IDL.name || "Import or create IDL"}</h1>
            </div>
            <div className=" flex gap-4 px-4 w-full h-[calc(100%-6rem)] rounded-3xl border-border">
                <div className="flex flex-col w-2/12">
                    <div className="flex flex-col h-[40%] w-full !border !border-border !p-5 !shadow-md !shadow-black  !text-chok !text-center !gap-3 !items-center !cursor-pointer !rounded-3xl !font-thin">
                        {
                            (!connection || !wallet) ?
                                <WalletMultiButton
                                    style={{
                                        display: "flex",
                                        border: "solid 1px #334155",
                                        borderRadius: "1.5rem",
                                        height: "min-content",
                                        width: "100%",
                                        alignSelf: "center",
                                        boxShadow: "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important"
                                    }}
                                />
                                :
                                "Get a soda for your template. Use this QR to mint your sodas"
                        }
                    </div>
                    <div className="flex flex-col w-full h-[40%] justify-center">
                        <p className="text-white text-lg text-center">Full Access NFT</p>
                        <Carousel images={images} />
                    </div>
                    <div className="flex flex-col h-[10%] w-full !border !border-border !p-5 !shadow-md !shadow-black  !text-chok !text-center !gap-3 !items-center justify-center  !rounded-3xl !font-thin">
                        🌌🔧 Build templates like a pro with Soda. Craft templates that simplify the blockchain experience. Ping here 🚀🧩
                    </div>
                </div>
                <div className="flex flex-col w-full justify-between">
                    {
                        templates.length ?
                            <div
                                className={`grid grid-cols-4 gap-4 w-full h-full rounded-2xl overflow-y-auto border-2 p-4 mini-scrollbar`}
                            >
                                {

                                    templates.map((template: any, i: number) => {
                                        const includeWallet = templateIncludesWallet?.find((temp) => temp.template === template.name)
                                        const addImage = { ...template, image: `/${template.name.replace(" ", "")}.png`, includeWallet: !!includeWallet }
                                        console.log(includeWallet)
                                        return (
                                            <CardTemplate key={template.name} template={addImage} indexTemplate={i} />
                                        )
                                    })
                                }
                            </div>
                            :
                            <div className=" flex justify-center items-center w-full h-full rounded-2xl overflow-y-auto border-2 p-4 mini-scrollbar">
                                <Loading />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Templates

export async function getStaticProps() {

    cloudinary.v2.config({
        cloud_name: "test-can", // add your cloud_name
        api_key: "212968211892683", // add your api_key
        api_secret: "_5nG8g_W5KOffvqmylSd5x8gVm4", // add your api_secret
        secure: true
    });

    const results = await cloudinary.v2.search.expression(
        'folder:can/*' // add your folder
    ).sort_by('public_id', 'desc').execute()

    return {
        props: {
            images: results.resources
        }
    }
}