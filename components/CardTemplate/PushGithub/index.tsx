import { FC, useState } from "react"
import { checkNFT, rustCliGen } from "@/helpers";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useIDL } from "@/context/IDL";
import JSZip from "jszip";
import { track } from "@vercel/analytics";
import * as fRA from '../../../restApiGitHub/functionsRestApi'


const PushGH: FC<any> = ({ indexTemplate, template, setDownload }) => {
    const { IDL } = useIDL()
    const [seterGitHub, setSeterGithub] = useState<boolean>(false)
    const { connection } = useConnection()
    const wallet = useAnchorWallet();
    const [settingGitHub, setSettingGitHub] = useState<any>({})

    const styleButton = "text-chok p-2 h-min rounded-3xl border border-border hover:bg-inputs hover:border-2 hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
    const styleInput = " rounded-md p-1 bg-inputs text-white placeholder-white"

    const handlerInfoRepo = (e: any) => {
        setSettingGitHub({
            ...settingGitHub,
            [e.target.name]: e.target.value
        })
    }

    const pushGitHub = async () => {
        if (await checkNFT(connection, wallet)) {
            setDownload(true)

            const response = indexTemplate == 5 ? rustCliGen(IDL) : await fetch(`https://soda.shuttleapp.rs/get_project_files/${indexTemplate}`, {
                method: "POST",
                body: JSON.stringify({ idl: IDL })
            }).then((res) => { return res.json() })
            const { files } = response

            const tree: any = [];

            files.Ok.forEach((file: any) => {
                const filePath = file.path.split('/').filter(Boolean);
                let currentNode = tree;

                filePath.forEach((pathSegment: any, index: any) => {
                    const isLastSegment = index === filePath.length - 1;
                    const existingNode = currentNode.find((node: any) => node.path === pathSegment);

                    if (existingNode) {
                        if (isLastSegment) {
                            existingNode.content = JSON.stringify(file.content);
                        } else if (!existingNode.tree) {
                            existingNode.tree = [];
                        }

                        currentNode = existingNode.tree;
                    } else {
                        const newNode: any = {
                            path: pathSegment,
                            mode: isLastSegment ? "100644" : "040000",
                            type: isLastSegment ? "blob" : "tree",
                        };

                        if (isLastSegment) {
                            newNode.content = JSON.stringify(file.content);
                        } else {
                            newNode.tree = [];
                        }

                        currentNode.push(newNode);
                        currentNode = newNode.tree;
                    }
                });
            });
            fRA.authentification(settingGitHub.userName, settingGitHub.repositoryName)
            const Head = await fRA.GetHead(settingGitHub.TOKEN);
            const CommitHead = await fRA.CommitHead(settingGitHub.TOKEN, Head)
            const TreeCommitHead = await fRA.TreeCommitHead(settingGitHub.TOKEN, CommitHead);

            const listFileAndDir: any = async (tree: any) => {

                let githubTree = []

                for (const node of tree) {

                    const absolutePath = node.path

                    if (node.type === "tree") {
                        const treeSubDir = await listFileAndDir(node.tree);
                        const baseTree = await fRA.RecursiveTree(settingGitHub.TOKEN, CommitHead, absolutePath)
                        const createTreeDir = await fRA.CreateTreeDir(settingGitHub.TOKEN, treeSubDir, baseTree?.sha)
                        githubTree.push({
                            path: absolutePath,
                            mode: '040000',
                            type: 'tree',
                            sha: createTreeDir.data.sha,
                        });

                    } else {

                        const createBlob = await fRA.CreateBlob(settingGitHub.TOKEN, node.content)

                        githubTree.push({
                            path: node.path,
                            mode: "100644",
                            type: "blob",
                            sha: createBlob.data.sha,
                        })

                    }

                }

                return githubTree
            }

            const parentTree = await listFileAndDir(tree)
            const CreateNewTreeHead = await fRA.CreateTreeDir(settingGitHub.TOKEN, parentTree, TreeCommitHead.data.sha)
            const CreateCommit = await fRA.CreateCommit(settingGitHub.TOKEN, Head, CreateNewTreeHead, template.name)
            const UpdateRef = await fRA.UpdateRef(settingGitHub.TOKEN, CreateCommit)
            setDownload(true)
            console.log(UpdateRef)

        }


    }


    const exportProject = async () => {
        if (await checkNFT(connection, wallet)) {


            const response = indexTemplate == 5 ? rustCliGen(IDL) : await fetch(`https://soda.shuttleapp.rs/get_project_files/${indexTemplate}`, {
                method: "POST",
                body: JSON.stringify({ idl: IDL })
            }).then((res) => { return res.json() })
            const { files } = response
            const zip = new JSZip();

            // Iterate over each file in the response
            files.Ok.forEach((file: any) => {
                const { path, content } = file;

                // Create folders and file in memory
                const folders = path.split('/');
                const fileName = folders.pop();

                let folder = zip;
                console.log(path)
                folders.forEach((folderName: any) => {
                    folder = folder.folder(folderName) as JSZip
                });

                // Set the content of the file
                if (typeof content.String != "undefined") {
                    folder.file(fileName, content.String);
                } else {
                    folder.file(fileName, content.Vec)
                }
            });

            // Generate the zip file asynchronously
            zip.generateAsync({ type: 'blob' }).then(blob => {
                // Provide a way for the user to download the zip file
                const url = URL.createObjectURL(blob);
                // Example: Create a download link and trigger the click event
                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                downloadLink.download = `${IDL.name || " "}.zip`;
                downloadLink.click();

                // Clean up the created URL object
                URL.revokeObjectURL(url);
            });
            setDownload(true)

            setTimeout(() => {
                setDownload(false)
            }, 2000)
        } else {
            alert("need to be connected with a wallet with the Soda NFT")
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-2">
                <div className="relative">
                    <button
                        className={styleButton }
                        onClick={() => setSeterGithub(!seterGitHub)}
                    >
                        Push GitHub
                    </button>

                    {
                        seterGitHub &&
                        <div className="absolute bottom-full z-50 flex flex-col gap-2 items-center bg-inputs rounded-md border-slate-500 border-2 p-2">
                            <input
                                className={styleInput}
                                placeholder="TOKEN"
                                name="TOKEN"
                                onChange={handlerInfoRepo}
                            />
                            <input
                                className={styleInput}

                                placeholder="Repository Name"
                                name="repositoryName"
                                onChange={handlerInfoRepo}
                            />
                            <input
                                className={styleInput}

                                placeholder="User Name"
                                name="userName"
                                onChange={handlerInfoRepo}
                            />
                            <button
                                className={styleButton}
                                onClick={pushGitHub}
                            >
                                Push
                            </button>
                        </div>
                    }
                </div>
                <button
                    className={styleButton}
                    onClick={() => { track(`${template.name}-export`); exportProject() }}
                >
                    Export
                </button>
            </div>

        </div>
    )
}

export default PushGH