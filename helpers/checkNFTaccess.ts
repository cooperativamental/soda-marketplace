import { FindNftsByOwnerOutput, Metadata, Metaplex, Nft, Sft, keypairIdentity } from "@metaplex-foundation/js";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";

type NFTAccess = {
    address: string,
    template: string,
}

const accessNFTS: Array<NFTAccess> = [
    {
        address: "Soda Anchor",
        template: "⚓ Anchor",
    },
    {
        address: "Soda Flutter",
        template: "🦋 Flutter",
    },
    {
        address: "Soda React Native",
        template: "📱 React Native",
    },
    {
        address: "Soda Seahorse",
        template: "🌊 Seahorse",
    },
    {
        address: "Soda Nextjs",
        template: "🌐 NextJS",
    },
    {
        address: "Soda Rust CLI",
        template: "Rust CLI",
    }
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