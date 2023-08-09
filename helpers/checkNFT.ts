import { FindNftsByOwnerOutput, Metadata, Metaplex, Nft, Sft, keypairIdentity } from "@metaplex-foundation/js";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";

const checkNFT = async (connection: any , wallet: AnchorWallet | undefined) => {
    const metaplex = new Metaplex(connection);
    const keypair = Keypair.generate();
    metaplex.use(keypairIdentity(keypair));
  
    const owner = {owner:wallet?.publicKey ?? new PublicKey("")}
    const allNFTs = await metaplex.nfts().findAllByOwner(owner)
    return allNFTs.some((NFT: Metadata | Nft | Sft)=>NFT.updateAuthorityAddress.toString() === "CSFhbHYEmB5N32kT8tWiJQAnT65sunqRw8saNth7dBpm")
    
}
export default checkNFT