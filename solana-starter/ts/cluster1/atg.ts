import wallet from "../turbin3-wallet.json"
import { Keypair, Connection, Commitment, PublicKey } from "@solana/web3.js"
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { createMetadataAccountV3, CreateMetadataAccountV3InstructionAccounts, CreateMetadataAccountV3InstructionArgs, DataV2Args } from "@metaplex-foundation/mpl-token-metadata";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// --- CONFIGURATION ---
const commitment: Commitment = "confirmed";
const connection = new Connection("https://devnet.helius-rpc.com/?api-key=71d05d9f-5d94-4548-9137-c6c3d9f69b3e", commitment);
const decimals = 6;
const mintAmount = 1_000_000n; // 1 token (with 6 decimals)
const metadataUri = "https://gold-tremendous-echidna-323.mypinata.cloud/ipfs/bafkreihqkf6ljxkxxhzdttmgudmlhndz3gbvxzmqfmyhft6bk5d6deua4e";

// --- SETUP WALLET & UMI ---
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
console.log(`Wallet Public Key: ${keypair.publicKey.toBase58()}`);
console.log(`Connecting to Solana Devnet with commitment: ${commitment}`);
const umi = createUmi('https://devnet.helius-rpc.com/?api-key=71d05d9f-5d94-4548-9137-c6c3d9f69b3e');
const umiKeypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, umiKeypair);
umi.use(signerIdentity(signer));

(async () => {
    try {
        console.log("\n--- STEP 1: Creating New Token Mint ---");
        console.log(`Token Decimals: ${decimals}`);
        // 1. Create a new mint
        const mint = await createMint(
            connection,
            keypair, // payer
            keypair.publicKey, // mint authority
            null, // freeze authority
            decimals
        );
        console.log(`Mint created: ${mint.toBase58()}`);

        console.log("\n--- STEP 2: Creating Metadata for the Mint ---");
        console.log(`Metadata URI: ${metadataUri}`);
        // 2. Create metadata for the mint
        const mintUmi = publicKey(mint.toBase58());
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint: mintUmi,
            mintAuthority: signer
        };
        let data: DataV2Args = {
            name: "ATG",
            symbol: "ATG",
            uri: "",
            sellerFeeBasisPoints: 0,
            creators: [],
            collection: null,
            uses: null
        };
        let args: CreateMetadataAccountV3InstructionArgs = {
            data,
            isMutable: true,
            collectionDetails: null
        };
        let tx = createMetadataAccountV3(
            umi,
            {
                ...accounts,
                ...args
            }
        );
        let result = await tx.sendAndConfirm(umi);
        console.log("Metadata created! Signature:", bs58.encode(result.signature));

        console.log("\n--- STEP 3: Minting Tokens ---");
        console.log(`Amount to Mint: ${mintAmount} (raw units, based on ${decimals} decimals)`);
        console.log(`Recipient: ${keypair.publicKey.toBase58()}`);
        // 3. Mint tokens to the wallet's associated token account
        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );
        console.log(`Associated Token Account (ATA) for recipient: ${ata.address.toBase58()}`);
        const mintTx = await mintTo(
            connection,
            keypair,
            mint,
            ata.address,
            keypair,
            mintAmount
        );
        console.log(`Tokens minted successfully. Transaction Signature: ${mintTx}`);
        console.log(`Check your wallet (${keypair.publicKey.toBase58()}) and the new mint address (${mint.toBase58()}) on Solscan.`);
    } catch(e) {
        console.error(`\nOops, something went wrong: ${e}`);
    }
})();
