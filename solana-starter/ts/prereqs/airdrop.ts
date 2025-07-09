import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js"
import wallet from "./dev-wallet.json"

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet)); // generates a keypair from 32 byte seed
// basically first 32 bytes are from private key and last 32 bytes are from public key

const connection = new Connection("https://api.devnet.solana.com"); // class Connection(endpoint, commitmentOrConfig?)
// next we make the connection to the devnet
// Connection class various useful methods like getBalance, getBlockTime, getTokenSupply.....

(async () => {
    try {
        console.log(keypair.publicKey)
        const txhash = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL); // 10^9
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();

// Here's the flow for airdrop
// first of all we get the keypair which has _keypair with publicKey, secretKey