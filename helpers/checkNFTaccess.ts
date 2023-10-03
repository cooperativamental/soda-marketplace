import { FindNftsByOwnerOutput, Metadata, Metaplex, Nft, Sft, keypairIdentity } from "@metaplex-foundation/js";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";

type NFTAccess = {
    address: string,
    template: string,
}

const accessNFTS: Array<NFTAccess> = [
    {
        address: "Soda Anchor-NextJS NFT",
        template: "Anchor-NextJs-Tailwind",
    },
    {
        address: "Soda Flutter NFT",
        template: "Flutter Client",
    },
    {
        address: "Soda React Native NFT",
        template: "React Native",
    },
    {
        address: "Soda Seahorse NFT",
        template: "Seahorse",
    },
]

const checkNFTaccess = async (connection: any, wallet: AnchorWallet | undefined) => {
    const metaplex = new Metaplex(connection);
    const keypair = Keypair.generate();
    metaplex.use(keypairIdentity(keypair));
    if (!connection || !wallet?.publicKey) return [];
    const owner = { owner: wallet?.publicKey }
    try {
        const allNFTs = await metaplex.nfts().findAllByOwner(owner)
        return accessNFTS.filter((access: NFTAccess) => allNFTs.some((NFT: Metadata | Nft | Sft) => NFT.name === access.address))
    } catch (error) {
        console.log(error)
        return []
    }
}
export default checkNFTaccess