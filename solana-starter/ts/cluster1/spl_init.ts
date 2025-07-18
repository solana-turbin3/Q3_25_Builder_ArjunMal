import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
// there are multiple commitment levels like finalized which provide more reliable guarantee that the transaction is confirmed by the block
// and extremly less likely that the transaction will be rolled back, while weaker commitment levels like processed give feedback faster but offer less certain
// confimations

// Solana defines three primary commitment levels
// Finalized: The highest level of certainty, indicating the block has been confirmed by a super-majority of stake (≥66 %), and at least 31 further confirmed blocks have been built on top of it, giving the slot the maximum 32-vote lock-out. A finalized transaction is effectively irreversible.
// Confirmed: An intermediate level where the block has been voted on by a supermajority of stake (≥66%), but not yet finalized by a more extended period of continued voting that makes it harder to reverse. This is often called optimistic confirmation, providing a strong assurance the transaction is on the “main fork,” or canonical chain.
// Processed: Processed means the transaction was just processed by a leader and included in the most recent block that the node knows about. However, that block may not yet have any cluster-wide votes. The transaction could still be dropped if that block doesn’t end up in the majority fork.

// Processed -> Confirmed -> Finalized

const connection = new Connection("https://devnet.helius-rpc.com/?api-key=71d05d9f-5d94-4548-9137-c6c3d9f69b3e", commitment);

(async () => {
    try {
        const mint = await createMint(connection, keypair, keypair.publicKey, null, 6)
        console.log(`Mint address: ${mint.toBase58()}`)
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()

// createMint() creates a new SPL token mint account
// here connection (devnet), payer is us, mintAuthority who can mint new tokens
// decimals -> 6 means 1 token = 1000000 base units


// after createMint we get mintAddress which is the identifier of new token
// no tokens just the definition of the token
// now we need to create token account for the user and mint tokens to that account

// next step is like 
// const token = new Token(....)
// const tokenAccount = await token.getOrCreateAssociatedAccInfo(pubkey)
// then token.mintTo....