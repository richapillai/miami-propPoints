import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { addressState, blockchainState } from "../../recoil/atoms";
import { THEME } from "../../theme/colors";
import { connectWallet } from "../../utils";

const DisconnectButton = ({ text, ml = "" }) => {
	const [address, setAddress] = useRecoilState(addressState);
	const navigate = useNavigate();

	const disconnectWallet = () => {
		setAddress("");
		if (window.solana.isConnected) {
			window.solana.disconnect();
		}
		navigate("/");
	};

	return (
		<Button
			ml={ml}
			bg={THEME.bgBabyBlue}
			onClick={disconnectWallet}
			color={THEME.textSecondary}>
			{text}
		</Button>
	);
};

export default DisconnectButton;
