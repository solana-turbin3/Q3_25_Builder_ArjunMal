// AMM (Automated Market Maker)
// Smart contract that allows decentralized trading of tokens without a traditional order book

/** Key terms in code */
// Liquidity Pool: A smart contract holding 2 tokens (e.g., SOL/USDC)
// Liquidity Providers (LP): Users who deposit tokens into the pool
// LP Tokens: Represent the user's share in the pool
// Swapping: Exchanging one token for another from the pool
// Slippage: Price change during swap execution
// Fee: Percentage cut taken on every trade, paid to LPs
// Curve: Mathematical rule used for price determination


/** Constant Product Formula */
// x*y = k
// x is the amount of token X and y is the amount of token Y and k is constant product
// curve: hyperbola like price curve


/** Instruction Flow */
// initialize: sets up config, vaults and LP mint, requires seed, fee and optionally authority

// depost: first depositor sets initial price (max_x, max_y)
// later LPs use pool ratio via xy_deposit_amounts_from_l()
// LP tokens are minted proportionally

// swap: uses constant product math to determine input/output amounts
// applies fee and check for slippage
// transfers tokens from user -> vault and vault -> user

// withdraw: LP tokens represent share of total liquidity
// can be redeemed via withdraw()


// [Admin]
//    │
//    └───> initialize()
//             │
//             ▼
//    [Creates Config, Vaults, LP Mint]

// [User]
//    │
//    ├───> deposit() ─────┐
//    │                    ▼
//    ├───> swap()       [LP Tokens Minted]
//    │                    │
//    └───> withdraw() ◄───┘



/** Important Accounts */
// config: PDA storing pool metadata (fee, authority, mints, bumps)
// vault_x / vault_y: Token accounts controlled by config (pool reserves)
// mint_lp: LP token mint (PDA)
// user_x_ata / user_y_ata: User's token accounts for deposits/swaps
// user_lp_ata: User's LP token account



/** Dev Notes */
// Uses anchor + constant-product-curve crate
// PDAs derived via seeds ensure unique pools per config
// Decimals assumed to be 6 (adjust as per tokens used)
