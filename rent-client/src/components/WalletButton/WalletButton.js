import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { addressState, blockchainState } from "../../recoil/atoms";
import { THEME } from "../../theme/colors";
import { connectWallet } from "../../utils";

const WalletButton = ({ text, ml = "" }) => {
	const [address, setAddress] = useRecoilState(addressState);
	const [blockchain, setBlockchain] = useRecoilState(blockchainState);
	const [buttonText, setButtonText] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		if (address && blockchain[address]) {
			navigate("/Score");
		} else {
			if (address) {
				setButtonText("Please register this address");
			}
			setAddress("");
		}
	}, [address]);

	return (
		<Button
			ml={ml}
			bg={THEME.bgBabyBlue}
			onClick={() => connectWallet(setAddress)}
			color={THEME.textSecondary}>
			{buttonText || text}
		</Button>
	);
};

export default WalletButton;
