import { CheckCircleIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { addressState, blockchainState, renterState } from "../../recoil";
import { THEME } from "../../theme/colors";
import makeSchedule from "../../utils/makeSchedule";

const ContractItem = ({ title, value }) => {
	return (
		<Flex>
			<Text mr='.25rem' fontWeight='bold'>
				{title}:
			</Text>
			{value}
		</Flex>
	);
};

const TitleItem = ({ name }) => {
	return (
		<Text fontSize='1.25rem' textTransform='uppercase' fontWeight='bold'>
			{name}
		</Text>
	);
};

const LeaseContent = ({ leases, removeLease, addLease }) => {
	const lease = leases[0];

	return (
		<Flex flexDir='column' gap='1rem' p='.75rem 2rem 2rem 2rem'>
			<Text fontSize='2rem' fontWeight='bold'>
				Lease Agreement
			</Text>
			<Flex flexDir='column'>
				<TitleItem name='General' />
				<ContractItem title='Property' value={lease.property} />
				<ContractItem title='Landlord' value={lease.landlord} />
				<ContractItem title='Tenant' value={lease.tenant} />
			</Flex>
			<Flex flexDir='column'>
				<TitleItem name='Payment' />
				<ContractItem
					title='Amount'
					value={`${lease.amount} SOL per ${lease.paidPer}`}
				/>
				<ContractItem
					title='Starting payment'
					value={lease.startingDate}
				/>
				<ContractItem title='Ending payment' value={lease.endingDate} />
			</Flex>
			<Flex justify='space-between' w='100%' gap='1rem'>
				<Button
					onClick={removeLease}
					w='50%'
					colorScheme='red'
					rightIcon={<CloseIcon />}>
					Deny
				</Button>
				<Button
					onClick={addLease}
					w='50%'
					colorScheme='green'
					rightIcon={<CheckIcon />}>
					Sign
				</Button>
			</Flex>
		</Flex>
	);
};

const NoLeases = () => {
	return (
		<Flex
			w='100%'
			py='4rem'
			px='2rem'
			align='center'
			gap='1rem'
			textAlign='center'
			flexDir='column'>
			<CheckCircleIcon color={THEME["completed"]} w={100} h={100} />
			<Text fontSize='2rem'>You currently have no pending leases!</Text>
		</Flex>
	);
};

function Sign() {
	const renter = useRecoilValue(renterState);
	const [blockchain, setBlockchain] = useRecoilState(blockchainState);
	const address = useRecoilValue(addressState);
	const addLease = () => {
		setBlockchain({
			...blockchain,
			[address]: {
				...renter,
				payments: [
					...makeSchedule(renter.pendingLeases[0]),
					...renter.payments,
				],
				pendingLeases: renter.pendingLeases.slice(1),
			},
		});
	};
	const removeLease = () => {
		setBlockchain({
			...blockchain,
			[address]: {
				...renter,
				pendingLeases: renter.pendingLeases.slice(1),
			},
		});
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
			<Flex
				flexDir='column'
				w='50%'
				bg={THEME.bgWhite}
				boxShadow='xl'
				borderRadius='1rem'>
				{renter.pendingLeases?.length ? (
					<>
						<Flex
							borderBottom={`${THEME.textBlue} solid 1px`}
							fontSize='1.5re'
							p='1rem'
							justify='space-between'>
							<Text>Incoming Leases</Text>
							<Text>1/{renter.pendingLeases.length}</Text>
						</Flex>
						<LeaseContent
							leases={renter.pendingLeases}
							addLease={addLease}
							removeLease={removeLease}
						/>
					</>
				) : (
					<NoLeases />
				)}
			</Flex>
		</Flex>
	);
}

export default Sign;
