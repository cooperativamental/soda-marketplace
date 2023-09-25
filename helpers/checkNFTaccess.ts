import { FindNftsByOwnerOutput, Metadata, Metaplex, Nft, Sft, keypairIdentity } from "@metaplex-foundation/js";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";

type NFTAccess = {
    address: string,
    template: string,
}

const accessNFTS: Array<NFTAccess> = [
    {
        address:"CSFhbHYEmB5N32kT8tWiJQAnT65sunqRw8saNth7dBpm",
        template:"Anchor-NextJs-Tailwind",
    }
]

const checkNFTaccess = async (connection: any , wallet: AnchorWallet | undefined) => {
    const metaplex = new Metaplex(connection);
    const keypair = Keypair.generate();
    metaplex.use(keypairIdentity(keypair));
    if (!connection || !wallet?.publicKey) return [];
    const owner = {owner:wallet?.publicKey}
    const allNFTs = await metaplex.nfts().findAllByOwner(owner)
    return accessNFTS.filter((access: NFTAccess)=>allNFTs.some((NFT: Metadata | Nft | Sft)=>NFT.updateAuthorityAddress.toString() === access.address))
}
export default checkNFTaccess