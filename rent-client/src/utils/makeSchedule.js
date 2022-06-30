const statuses = ["missing", "due", "complete", "late"];

const makeSchedule = ({
	landlord,
	amount,
	paidPer,
	startingDate,
	endingDate,
}) => {
	const schedule = [];
	const numMonths =
		Number(endingDate.slice(0, 2)) - Number(startingDate.slice(0, 2));
	console.log(numMonths);
	console.log(endingDate.slice(0, 2));
	console.log(startingDate.slice(0, 2));

	for (let i = 0; i < numMonths; i++) {
		const status = statuses[1];
		const timestamp =
			(Number(i) + Number(startingDate.slice(0, 2))).toString() +
			startingDate.slice(2);
		const payment = {
			amount,
			recipient: landlord,
			timestamp,
			status,
		};
		schedule.push(payment);
	}

	return schedule;
};
export default makeSchedule;
