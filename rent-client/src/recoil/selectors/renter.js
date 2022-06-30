import { selector } from "recoil";
import { addressState, blockchainState } from "../atoms";

const getRenter = ({ get }) => {
	const address = get(addressState);
	const blockchain = get(blockchainState);
	const renter = blockchain[address] || {
		payments: [],
		score: 0,
		pendingLeases: [],
	};
	return renter;
};

const renterState = selector({
	key: "renterState",
	get: getRenter,
});

export default renterState;
