use anchor_lang::prelude::*;

pub const ROOT_SPACE: usize = 8 + 1 + 32;

#[account]
pub struct Root {
    pub bump: u8,
    pub authority: Pubkey,
}
