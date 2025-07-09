import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://devnet.helius-rpc.com/?api-key=71d05d9f-5d94-4548-9137-c6c3d9f69b3e", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("cccTJNELHGmTm3McSwDSHdr1R85dsQEipyJqGeSZtc3");

(async () => {
    try {
        // checking the mint
        const mintInfo = await getMint(connection, mint)
        console.log(mintInfo)

        // ata
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)
        console.log(`{ATA is ${ata.address.toBase58()}}`);

        // minting to ata
        const minTx = await mintTo(connection, keypair, mint, ata.address, keypair, token_decimals)
        console.log(`txid ${minTx}`)

    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
