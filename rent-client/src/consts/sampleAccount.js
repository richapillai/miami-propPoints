import { sampleLease, sampleLease2 } from "./sampleLease";
import samplePayments from "./samplePayments";

const sampleAccount = {
	score: 69,
	payments: samplePayments,
	creditScore: 690,
	backgroundCheck: [],
	pendingLeases: [sampleLease, sampleLease2],
};

export default sampleAccount;
