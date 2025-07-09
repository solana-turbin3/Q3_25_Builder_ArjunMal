// commitment level 
// we have processed confirmed finalized recent single singleGossip root max

// processed is a little less reliable
// there are multiple commitment levels like finalized which provide more reliable guarantee that the transaction is confirmed by the block
// and extremly less likely that the transaction will be rolled back, while weaker commitment levels like processed give feedback faster but offer less certain
// confimations

// Solana defines three primary commitment levels
// Finalized: The highest level of certainty, indicating the block has been confirmed by a super-majority of stake (≥66 %), and at least 31 further confirmed blocks have been built on top of it, giving the slot the maximum 32-vote lock-out. A finalized transaction is effectively irreversible.
// Confirmed: An intermediate level where the block has been voted on by a supermajority of stake (≥66%), but not yet finalized by a more extended period of continued voting that makes it harder to reverse. This is often called optimistic confirmation, providing a strong assurance the transaction is on the “main fork,” or canonical chain.
// Processed: Processed means the transaction was just processed by a leader and included in the most recent block that the node knows about. However, that block may not yet have any cluster-wide votes. The transaction could still be dropped if that block doesn’t end up in the majority fork.

// Processed -> Confirmed -> Finalized


// multiple parameters in createMint
// umi metaplex -> steps -> umi connection, createMetadataAccountV3InstructionArgs, DataV2Args


// token info solscan.io read the json
// ata = await getOrCreateAssociatedTokenAccount()
// mint tx = mintTo(diff parameters)

// bpfloader?
// When you deploy a program (e.g., your smart contract written in Rust)
// The Solana system program responsible for deploying smart contracts (aka programs) onto the blockchain.
// BPF = Berkeley Packet Filter, a virtual machine format that Solana uses for compiled programs (from Rust/C).
// (.so files)


// token account vs associated token account
// An account that stores tokens of a mint | A special, derived token account (1 per mint-wallet pair)
// createAccount() | getOrCreateAssociatedTokenAccount()
// can be derived using pubkey | derived using pubkey + mint address
// many | only one exists per wallet, mint

// To perform token transfer:
//  - Get mint
//  - Get or create ATA for sender/recipient
//  - Transfer token from sender ATA to recipient ATA