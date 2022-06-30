use crate::instructions::*;
use crate::state::*;
use anchor_lang::prelude::*;

#[macro_use]
pub mod instructions;
pub mod state;
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod rent_contracts {
    use super::*;

    pub fn initialize_root(ctx: Context<InitializeRoot>) -> Result<()> {
        msg!("Initialize root!");
        instructions::initialize_root::handler(ctx)
    }

    pub fn initialize_user_account(ctx: Context<InitializeUserAccount>, ssn: u128) -> Result<()> {
        msg!("Initialized user");
        instructions::initialize_user_account::handler(ctx, ssn)
    }
}
