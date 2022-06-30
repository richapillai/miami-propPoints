import { Box, Flex, Text } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { addressState, renterState } from "../../recoil";
import { THEME } from "../../theme/colors";
import { connectWallet } from "../../utils";

const PaymentSummary = ({ type, number }) => {
	return (
		<Flex align='center' flexDir='column'>
			<Box fontWeight='bold'> {type} Payments:</Box>
			<Box>{number}</Box>
		</Flex>
	);
};

const getPaymentCategories = (payments) => {
	const missing = payments.filter(
		(payment) => payment.status === "missing"
	).length;

	const late = payments.filter((payment) => payment.status === "late").length;
	const total =
		payments.length -
		payments.filter((payment) => payment.status === "due").length;

	return { missing, late, total };
};

function Score() {
	const { score, payments } = useRecoilValue(renterState);
	const { missing, late, total } = getPaymentCategories(payments);
	const MAX_SCORE = 850;
	return (
		<Flex
			flexDir='column'
			w='100vw'
			justify='center'
			bg={THEME.bgGray}
			align='center'
			p='4rem'
			h='calc(100vh - 6rem)'>
			<Flex
				w={{ base: "100%", md: "60%" }}
				justify='center'
				mb='2rem'
				align='center'
				bg={THEME.bgWhite}
				shadow='xl'
				p='2rem'
				flexDir='column'
				borderRadius='.5rem'>
				<Text fontWeight='bold' fontSize='1.5rem'>
					RENT SCORE:
				</Text>
				<Text fontWeight='bold' fontSize='3rem'>
					{score}
				</Text>
				<Flex w='100%' py='1rem' justify='space-between'>
					<Text>Very Poor</Text>
					<Text>Poor</Text>
					<Text>Fair</Text>
					<Text>Good</Text>
				</Flex>
				<Flex
					h='1rem'
					align='center'
					w='100%'
					bg={"blue"}
					bgGradient={
						"linear(to-r, red, orange, yellow, green.300, green.700)"
					}>
					<Box
						w='1.5rem'
						h='1.5rem'
						borderRadius='1rem'
						bg={THEME.bgBlue}
						ml={`${(score / MAX_SCORE) * 100}%`}></Box>
				</Flex>
				<Flex w='100%' justify='space-between'>
					<Text>0</Text>
					<Text>{MAX_SCORE}</Text>
				</Flex>
			</Flex>
			<Flex gap='4rem'>
				<PaymentSummary type='Missed' number={missing} />
				<PaymentSummary type='Late' number={late} />
				<PaymentSummary type='Total' number={total} />
			</Flex>
		</Flex>
	);
}

export default Score;
