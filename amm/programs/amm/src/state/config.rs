use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Config {
    pub seed: u64, // for different pools config
    pub authority: Option<Pubkey>, // authority to lock config account
    pub mint_x : Pubkey, // for token X
    pub mint_y: Pubkey, // for token Y
    pub fee: u16, // Swap fee in basis points
    pub locked: bool, // to check if the pool is locked
    pub config_bump: u8, // seeds for config account
    pub lp_bump: u8 // bump seeds for LP token
}