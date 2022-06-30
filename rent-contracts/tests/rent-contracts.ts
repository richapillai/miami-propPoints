import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { RentContracts } from "../target/types/rent_contracts";
const { SystemProgram } = anchor.web3;

describe("rent-contracts", () => {
	// Configure the client to use the local cluster.
	anchor.setProvider(anchor.AnchorProvider.env());

	const program = anchor.workspace.RentContracts as Program<RentContracts>;

	it("Is initialized!", async () => {
		// Add your test here.
		const authKP = anchor.web3.Keypair.generate();
		const signerKP = anchor.web3.Keypair.generate();
		const programPK = "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS";

		try {
			const tx = await program.rpc.initializeRoot({
				accounts: {
					authority: authKP.publicKey,
					payer: signerKP.publicKey,
					root: programPK,
					systemProgram: SystemProgram.programId,
				},
				signers: [authKP, signerKP],
			});
			console.log("Your transaction signature", tx);
		} catch (error) {
			console.log(error);
			throw error;
		}
	});
});
