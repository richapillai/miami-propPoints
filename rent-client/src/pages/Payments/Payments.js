import {
	Box,
	Flex,
	Link,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { addressState, blockchainState, renterState } from "../../recoil";
import { THEME } from "../../theme/colors";
import { createTransaction } from "../../utils";

const PaymentRow = ({ timestamp, recipient, amount, status, index }) => {
	const address = useRecoilValue(addressState);
	const renter = useRecoilValue(renterState);
	const [blockchain, setBlockchain] = useRecoilState(blockchainState);

	const pay = async () => {
		try {
			await createTransaction(address, recipient);
			setBlockchain({
				...blockchain,
				[address]: {
					...renter,
					payments: renter.payments
						.slice(0, index)
						.concat({
							timestamp,
							recipient,
							amount,
							status: "completed",
						})
						.concat(renter.payments.slice(index + 1)),
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Tr>
			<Td>{timestamp}</Td>
			<Td>{recipient}</Td>
			<Td>{amount} SOL</Td>
			<Td>
				<Flex
					color={THEME.textWhite}
					bg={THEME[status] || THEME["late"]}
					py='.5rem'
					justify='center'
					borderRadius='.5rem'>
					{status}
				</Flex>
			</Td>
			<Td>
				{status === "missing" || status === "due" ? (
					<Flex
						color={THEME.textWhite}
						bg={THEME.bgBlue}
						py='.5rem'
						justify='center'
						cursor='pointer'
						onClick={pay}
						borderRadius='.5rem'>
						Pay
					</Flex>
				) : (
					<Flex
						color={THEME.textBlue}
						py='.5rem'
						justify='center'
						cursor='pointer'
						_hover={{ textDecor: "underline" }}
						borderRadius='.5rem'>
						Solscan
					</Flex>
				)}
			</Td>
		</Tr>
	);
};

const PaymentRows = ({ payments }) => {
	return (
		<Tbody maxH='100%' overflowY='auto'>
			{payments.map(({ timestamp, recipient, amount, status }, index) => (
				<PaymentRow
					key={index}
					timestamp={timestamp}
					recipient={recipient}
					amount={amount}
					status={status}
					index={index}
				/>
			))}
		</Tbody>
	);
};

const getPaymentCategories = (payments) => {
	const outstanding = payments.filter(
		(payment) => payment.status === "missing" || payment.status === "due"
	);

	const paid = payments.filter(
		(payment) => payment.status === "completed" || payment.status === "late"
	);

	return { paid, outstanding };
};

const TableSelector = ({ name, onClick, currData }) => {
	const nameNums = {
		All: 0,
		Outstanding: 1,
		Missing: 2,
	};

	return (
		<Flex
			borderBottom={`2px solid ${
				currData === nameNums[name] ? THEME.bgBabyBlue : THEME.textGray
			}`}
			onClick={onClick}
			height='2rem'
			cursor='pointer'
			px='2rem'
			fontWeight='bold'>
			{name}
		</Flex>
	);
};

function Payments() {
	const renter = useRecoilValue(renterState);
	const { outstanding, paid } = getPaymentCategories(renter.payments);
	const payments = {
		0: renter.payments,
		1: outstanding,
		2: paid,
	};

	const [currData, setCurrData] = useState(0);
	const clickData = (num) => {
		setCurrData(num);
	};

	return (
		<Flex
			flexDir='column'
			w='100vw'
			justify='center'
			bg={THEME.bgGray}
			align='center'
			p='4rem'
			h='calc(100vh - 6rem)'>
			<Flex w='100%'>
				<TableSelector
					currData={currData}
					name='All'
					onClick={() => clickData(0)}
				/>
				<TableSelector
					currData={currData}
					name='Outstanding'
					onClick={() => clickData(1)}
				/>
				<TableSelector
					currData={currData}
					name='Paid'
					onClick={() => clickData(2)}
				/>
			</Flex>
			<TableContainer
				overflowY='scroll'
				boxShadow='xl'
				bg={THEME.bgWhite}
				w='100%'
				css={{
					"&::-webkit-scrollbar": {
						width: "0px",
					},
					"&::-webkit-scrollbar-track": {
						width: "0px",
					},
					"&::-webkit-scrollbar-thumb": {
						borderRadius: "0px",
					},
				}}>
				<Table>
					<Thead borderBottom={`2px solid ${THEME.textBlue}`}>
						<Tr>
							<Th>Date Due</Th>
							<Th>To</Th>
							<Th>Amount</Th>
							<Th textAlign='center'>Status</Th>
							<Th textAlign='center'>Action</Th>
						</Tr>
					</Thead>
					<PaymentRows payments={payments[currData]} />
				</Table>
			</TableContainer>
		</Flex>
	);
}

export default Payments;
