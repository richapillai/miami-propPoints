import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	Image,
	Input,
	InputGroup,
	InputLeftAddon,
	InputLeftElement,
	Link,
	Text,
} from "@chakra-ui/react";
import { THEME } from "../../theme/colors";
import cards from "../../assets/cards.svg";
import { useState } from "react";
import { Link as RouterLink, Router, useNavigate } from "react-router-dom";
import { projectName } from "../../consts";
import { useRecoilState } from "recoil";
import { addressState, blockchainState } from "../../recoil/atoms";
import { WalletButton } from "../../components";
import { connectWallet } from "../../utils";

function Register() {
	const [ssn, setSsn] = useState("");
	const [ssnError, setSsnError] = useState("");
	const handleChange = (event) => {
		const toSet = event.target.value;
		setSsn(toSet);
		setSsnError(toSet !== "" && toSet.length !== 9);
	};

	const [address, setAddress] = useRecoilState(addressState);
	const navigate = useNavigate();
	const [blockchain, setBlockchain] = useRecoilState(blockchainState);

	const submitForm = (address, ssn) => {
		// send transaction to create an account
		console.log(`address: ${address}`);
		console.log(`ssn: ${ssn}`);

		if (!blockchain[address]) {
			setBlockchain({
				...blockchain,
				[address]: {
					score: 579,
					payments: [],
					creditScore: 579,
					backgroundCheck: [],
					pendingLeases: [],
				},
			});
		}

		// check if there is anything that has this address or SSN => create account
		navigate("/Score");
	};

	return (
		<Flex
			h='calc(100vh - 6rem)'
			bg={THEME.bgGray}
			w='100vw'
			align='center'
			justify='center'
			p='4rem'>
			<Flex>
				<Flex flexDir='column' align='end' justify='center' w='50%'>
					<Text alignSelf='flex-start' w='60%'>
						Just a few clicks away from creating your{" "}
						{projectName + " "}
						account.
					</Text>
					<Image src={cards} h='80%' />
				</Flex>
				<Flex
					w='50%'
					bg={THEME.bgWhite}
					gap='2rem'
					boxShadow='xl'
					p='1rem'
					borderRadius='.5rem'
					flexDir='column'>
					<Text fontWeight='bold' fontSize='1.5rem'>
						Register
					</Text>
					<Text fontWeight='bold'>
						This page will help {projectName} create your unique
						user id.{" "}
					</Text>
					<FormControl
						flexDir='column'
						display='flex'
						isInvalid={ssnError}>
						<InputGroup>
							<InputLeftAddon>SSN </InputLeftAddon>
							<Input onChange={handleChange} type='text' />
						</InputGroup>
						{ssnError && (
							<FormErrorMessage>
								Please enter a valid SSN.
							</FormErrorMessage>
						)}
					</FormControl>

					{!window.solana.isConnected ? (
						<Text>
							Please connect your wallet{" "}
							<Link
								color={THEME.textBabyBlue}
								textDecoration='underline'
								onClick={() => connectWallet(setAddress)}>
								here
							</Link>
						</Text>
					) : (
						<Box wordBreak='break-all'>
							The address associated with your SSN will be{" "}
							<Text wordBreak='break-all' fontWeight='bold'>
								{address}
							</Text>
						</Box>
					)}
					<Button
						color={THEME.textWhite}
						disabled={
							!window.solana.isConnected || ssnError || ssn === ""
						}
						bg={THEME.bgBlue}
						onClick={() => submitForm(address)}>
						CREATE ACCOUNT
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default Register;
