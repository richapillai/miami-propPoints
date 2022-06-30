const connectWallet = async (setAddress) => {
	const isPhantomInstalled = window.solana && window.solana.isPhantom;
	if (!isPhantomInstalled) {
		return;
	}
	window.solana
		.connect()
		.then(({ publicKey }) => {
			const pubAddress = JSON.stringify(publicKey).slice(1, -1);
			setAddress(pubAddress);
		})
		.catch((err) => console.log(err));
};

export default connectWallet;
