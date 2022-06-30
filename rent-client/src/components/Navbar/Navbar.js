import { Button, Flex, Link, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { THEME } from "../../theme/colors";
import { Link as RouterLink } from "react-router-dom";
import { projectName } from "../../consts";
import WalletButton from "../WalletButton";
import { useRecoilState } from "recoil";
import { addressState } from "../../recoil/atoms";
import { connectWallet } from "../../utils";
import DisconnectButton from "../DisconnectButton";

const NavContent = ({ screen }) => {
	const [address, setAddress] = useRecoilState(addressState);
	const COLOR_TOGGLE = {
		textPrimary: screen.pathname === "/" ? THEME.textWhite : THEME.textBlue,
		textSecondary: THEME.textBlue,
		bg: screen.pathname === "/" ? THEME.bgBlue : THEME.bgWhite,
	};

	if (screen.pathname === "/") {
		return (
			<>
				<Text ml='auto' color={COLOR_TOGGLE.textPrimary}>
					Have an account?
				</Text>
				<WalletButton text='Sign In' />
			</>
		);
	}

	if (screen.pathname === "/Register") {
		return null;
	}

	if (!address && window.solana) {
		connectWallet(setAddress);
	}

	return (
		<>
			<Flex
				height='calc(6rem - 1px)'
				px='1rem'
				borderBottom={
					screen.pathname === "/Score"
						? `${THEME.bgBabyBlue} solid 2px`
						: null
				}
				align='center'
				color={COLOR_TOGGLE.textPrimary}>
				<RouterLink to='/Score'> Score</RouterLink>
			</Flex>
			<Flex
				height='calc(6rem - 1px)'
				px='1rem'
				ml='1rem'
				align='center'
				borderBottom={
					screen.pathname === "/Payments"
						? `${THEME.bgBabyBlue} solid 2px`
						: null
				}
				color={COLOR_TOGGLE.textPrimary}>
				<RouterLink to='/Payments'> Payments</RouterLink>
			</Flex>
			<Flex
				height='calc(6rem - 1px)'
				px='1rem'
				ml='1rem'
				align='center'
				borderBottom={
					screen.pathname === "/Sign"
						? `${THEME.bgBabyBlue} solid 2px`
						: null
				}
				color={COLOR_TOGGLE.textPrimary}>
				<RouterLink to='/Sign'> Sign</RouterLink>
			</Flex>
			<DisconnectButton ml='auto' text={"Disconnect"} />
		</>
	);
};

function Navbar() {
	const location = useLocation();
	console.log(location);

	const COLOR_TOGGLE = {
		textPrimary:
			location.pathname === "/" ? THEME.textWhite : THEME.textBlue,
		textSecondary: THEME.textBlue,
		bg: location.pathname === "/" ? THEME.bgBlue : THEME.bgWhite,
	};

	return (
		<Flex
			h='6rem'
			zIndex={100}
			position='relative'
			style={{ boxShadow: "0 2px 3px 2px rgba(0,0,0,.2)" }}
			p='2rem'
			justify='flex-start'
			align='center'
			gap='1rem'
			bg={COLOR_TOGGLE.bg}>
			<Link
				pr='1rem'
				_hover={{ textDecor: "none" }}
				fontSize='1.5rem'
				color={COLOR_TOGGLE.textPrimary}
				href='/'>
				{projectName}
			</Link>
			<NavContent screen={location} />
		</Flex>
	);
}

export default Navbar;
