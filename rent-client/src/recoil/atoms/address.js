import { atom } from "recoil";

const getAddress = async () => {
	return "";
};

const addressState = atom({
	key: "addressState",
	default: getAddress(),
});

export default addressState;
