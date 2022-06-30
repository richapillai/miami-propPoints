use anchor_lang::prelude::*;

pub const USER_ACCOUNT_SPACE: usize = 8 + 1 + 1;

#[account]
pub struct UserAccount {
    pub bump: u8,
    pub score: u8,
    pub payments_index: u8,
    pub payments: [Payment; 8]
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Default)]
pub struct Payment {
    pub timestamp: u64,
    pub amount: u32,
    pub recipient: Pubkey,
    // 0 means "", 1 means "", 2 means "", 3 means ""
    pub status: u8,
}