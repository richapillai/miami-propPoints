use anchor_lang::prelude::*;
use crate::Root;
use crate::UserAccount;
use crate::USER_ACCOUNT_SPACE;

#[derive(Accounts)]
#[instruction(
    ssn_hash: u128,
)]
pub struct InitializeUserAccount<'info> {
    pub user: Signer<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        seeds = [b"ROOT"],
        bump = root.bump,
    )]
    pub root: Account<'info, Root>,

    #[account(
        init,
        seeds = [ssn_hash.to_le_bytes().as_ref(), root.key().as_ref()],
        bump,
        space = USER_ACCOUNT_SPACE,
        payer = payer
    )]
    pub user_account: Account<'info, UserAccount>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeUserAccount>,
    ssn_hash: u128,
) -> Result<()> {
    ctx.accounts.user_account.bump = *ctx.bumps.get("user_account").unwrap();
    ctx.accounts.user_account.score = 0u8;
    ctx.accounts.user_account.payments_index = 0u8;

    Ok(())
}
