interface LiveGame {
	_id: string;
	total: number;
	sendIn: number;
	sendOut: number;
	result: string;
	isEnd: false;
	server: string;
	timeBoss: string;
	resultUser: string;
	timeEnd: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

interface UserBetData {
	_id: string;
	uid: string;
	betId: string;
	amount: number;
	result: string;
	resultBet: string;
	server: string;
	receive: number;
	isEnd: boolean;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

interface UserData {
	_id: string;
	username: string;
	pwd_h: string;
	email: string;
	name: string;
	gold: number;
	diamon: number;
	clan: string;
	totalBet: number;
	limitedTrade: number;
	isBan: boolean;
	isReason: string;
	server: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	ip_address: string;
	trade: number;
	avatar: string;
	totalBank: number;
	type: string;
	vip: number;
	totalClan: number;
	deposit: number;
	withdraw: number;
	totalbank: number;
}
