import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { THEME } from "../../theme/colors";
import waves from "../../assets/waves.svg";
import { Link } from "react-router-dom";
import { projectName } from "../../consts";

function Landing() {
	return (
		<Flex
			bg={THEME.bgBlue}
			flexDir='column'
			align='flex-start'
			p='2rem'
			gap='2rem'
			h='calc(100vh - 6rem)'
			justify='space-around'>
			<Image
				position='absolute'
				width={"65vw"}
				height={"50vh"}
				top={"20%"}
				right={0}
				src={waves}
			/>
			<Box
				mt='4rem'
				fontWeight='bold'
				fontSize='3rem'
				color={THEME.textWhite}
				w='40%'>
				The protocol for fair rental credit checks
			</Box>

			<Text w='60%' fontSize='1.5rem' color={THEME.textWhite}>
				{projectName} ensures a quick, transparent, and secure way for
				landlords to gain an understanding of their tenant's propensity
				to pay and trustworthiness. Tenant transactions are immutably
				recorded and processed without any intermediary party.
			</Text>
			<Button px='4rem' bg={THEME.bgBabyBlue} color={THEME.textBlue}>
				<Link py='1rem' to='/Register'>
					REGISTER
				</Link>
			</Button>
		</Flex>
	);
}

export default Landing;
