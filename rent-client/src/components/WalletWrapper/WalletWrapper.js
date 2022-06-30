import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { addressState } from "../../recoil/atoms";

const WalletWrapper = ({ children }) => {
	const isPhantomInstalled = window.solana && window.solana.isPhantom;
	const [address, setAddress] = useRecoilState(addressState);

	return <>{children}</>;
};

export default WalletWrapper;
