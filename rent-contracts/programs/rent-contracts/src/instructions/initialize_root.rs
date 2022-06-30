use anchor_lang::prelude::*;
use crate::Root;
use crate::ROOT_SPACE;

#[derive(Accounts)]
pub struct InitializeRoot<'info> {
    pub authority: Signer<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        init,
        seeds = [b"ROOT"],
        bump,
        space = ROOT_SPACE,
        payer = payer
    )]
    pub root: Account<'info, Root>,

    pub system_program: Program<'info, System>,

}

pub fn handler(
    ctx: Context<InitializeRoot>,
) -> Result<()> {
    ctx.accounts.root.bump = *ctx
        .bumps
        .get("root")
        .unwrap();
    ctx.accounts.root.authority = ctx.accounts.authority.key();

    Ok(())
}
