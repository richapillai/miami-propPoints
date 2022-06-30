import { atom } from "recoil";
import sa1 from "../../consts/sampleAccounts/sa1";
import sa2 from "../../consts/sampleAccounts/sa2";

const getBlockchain = async () => {
	const blockchain = {
		FdyxwBzPm5M4uGjHFRKXNbqudzm7vG1u9XUM3wB1C1A6: sa1,
		"2LLLGuGKFDVoJRRJTPPPwZE8pMSHUj6MVTEGbc1EArnZ": sa2,
	};

	return blockchain;
};

const blockchainState = atom({
	key: "blockchainState",
	default: getBlockchain(),
});

export default blockchainState;
