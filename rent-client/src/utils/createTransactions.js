import {
	Connection,
	Keypair,
	PublicKey,
	sendAndConfirmTransaction,
	SystemInstruction,
	SystemProgram,
	Transaction,
	TransactionInstruction,
} from "@solana/web3.js";

const createTransaction = async (from, to) => {
	console.log(from);
	if (!window.solana.isConnected) {
		return;
	}

	// Was not able to fully connect the front-end to the smart contracts
	const message = `Please click approve to pay the rent.`;
	const encodedMessage = new TextEncoder().encode(message);
	const signedMessage = await window.solana.signMessage(
		encodedMessage,
		"utf8"
	);

	console.log(signedMessage);
};

export default createTransaction;
