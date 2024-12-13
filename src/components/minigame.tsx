'use client';

import { useAppSelector } from '@/lib/redux/hook';
import apiClient from '@/lib/server/apiClient';
import { useSocket } from '@/lib/server/socket';
import moment from 'moment';
import { useEffect, useState } from 'react';
import NoticeModel from './model/notice';

interface ResultUser {
	t?: number;
	x?: number;
	c?: number;
	l?: number;
	1?: number;
	0?: number;
}

interface StoreGame {
	[key: string]: LiveGame;
}

interface Result {
	'0'?: string;
	'1'?: string;
	C?: string;
	L?: string;
	T?: string;
	X?: string;
	CT?: string;
	LX?: string;
	LT?: string;
	CX?: string;
	[key: string]: string | undefined;
}

const TranslateKey: Result = {
	'0': 'Khỉ Đỏ',
	'1': 'Khỉ Đen',
	C: 'Chẵn',
	L: 'Lẻ',
	T: 'Tài',
	X: 'Xỉu',
	CT: 'Chẵn Tài',
	LX: 'Lẻ Xỉu',
	LT: 'Lẻ Tài',
	CX: 'Chẵn Xỉu',
};

type ServerList = 'all' | '1' | '2' | '3' | '4';

interface Filter {
	server: ServerList;
	name: string | null;
}

interface GetLiveGame {
	livegame: LiveGame[];
	userBets: UserBetData[];
}

export default function Minigame() {
	const user = useAppSelector((state) => state.user);
	const [filter, setFilter] = useState<Filter>({
		server: 'all',
		name: null,
	});
	const [search, setSearch] = useState<string>('');
	const [resultSv24, setResultSv24] = useState({
		old: '',
		new: '',
	});
	const [game, setGame] = useState<StoreGame>();
	const [userBets, setUserBet] = useState<UserBetData[]>([]);
	const socket = useSocket();
	useEffect(() => {
		const getLive = async () => {
			try {
				const { data }: { data: GetLiveGame } = await apiClient.get(
					'/bet-log/live',
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					},
				);
				const { livegame, userBets } = data;
				const newGame: StoreGame = {};
				livegame.forEach((item) => {
					newGame[item.server] = item;
				});
				// Add setData game
				setGame(newGame);
				setUserBet(userBets);
			} catch (err: any) {}
		};
		if (user.isLogin) {
			getLive();
		}
	}, [user]);

	useEffect(() => {
		socket.on('status-boss', (data) => {
			const { boss, server } = data;
			setGame((prev) => ({
				...prev,
				[server]: boss,
			}));
		});
		socket.on('status-24/24', (data) => {
			const { new_bet } = data;
			setGame((prev) => ({
				...prev,
				'24': new_bet,
			}));
		});
		socket.on('mainBet-up', (data: LiveGame) => {
			const { server } = data;
			setGame((prev) => ({
				...prev,
				[server]: data,
			}));
		});

		//TODO ———————————————[Handler Realtime Userbet]———————————————
		socket.on('re-bet-user-ce-sv', (data) => {
			const userBet = data.data[0];
			setUserBet((ub) => [...ub, userBet]);
		});
		socket.on('re-bet-user-ce-boss', (data) => {
			const userBet = data.data[0];
			setUserBet((ub) => [...ub, userBet]);
		});

		socket.on('bet-user-del-boss-re', (data) => {
			const userBetId = data.data.userBetId;
			setUserBet((ub) => [...ub.filter((u) => u._id !== userBetId)]);
		});
		socket.on('bet-user-del-sv-re', (data) => {
			const userBetId = data.data.userBetId;
			setUserBet((ub) => [...ub.filter((u) => u._id !== userBetId)]);
		});

		socket.on('re-bet-user-res-sv', (data) => {
			const newBetUser: UserBetData[] = data.data;
			setUserBet((ub) =>
				ub.map((u) => {
					let target_u = newBetUser.find((nu) => nu._id === u._id);
					if (target_u) {
						target_u.isEnd = true;
						return target_u;
					} else {
						return u;
					}
				}),
			);
		});
		socket.on('re-bet-user-res-boss', (data) => {
			const newBetUser: UserBetData[] = data.data;
			setUserBet((ub) =>
				ub.map((u) => {
					let target_u = newBetUser.find((nu) => nu._id === u._id);
					if (target_u) {
						target_u.isEnd = true;
						return target_u;
					} else {
						return u;
					}
				}),
			);
		});
		return () => {
			socket.off('status-boss');
			socket.off('status-24/24');
			socket.off('mainBet-up');
			socket.off('re-bet-user-ce-sv');
			socket.off('re-bet-user-ce-boss');
			socket.off('bet-user-del-boss-re');
			socket.off('bet-user-del-sv-re');
			socket.off('re-bet-user-res-sv');
			socket.off('re-bet-user-res-boss');
		};
	}, [socket]);

	//TODO ———————————————[Handler Filter]———————————————
	const handlerServerFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value as ServerList;
		setFilter((f) => ({ ...f, server: value }));
	};

	const handlerSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (search.length === 0) {
			setFilter((f) => ({ ...f, name: null }));
		} else {
			setFilter((f) => ({ ...f, name: search }));
		}
		return;
	};

	const handlerChangeResultSv24 = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();
		if (game) {
			let betId = game['24']._id;
			try {
				await apiClient.post(
					`/bet-log/change/24/${betId}`,
					{
						newResult: resultSv24.new,
					},
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					},
				);
				let dialog = document.getElementById(
					'notice_change_result',
				) as HTMLDialogElement;
				if (dialog) {
					dialog.show();
				}
			} catch (err: any) {
				console.log(err);
			}
		}
		return;
	};

	const handlerGetResultSv24 = async () => {
		if (game) {
			let betId = game['24']._id;
			try {
				const { data } = await apiClient.get(`/bet-log/result/24/${betId}`, {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				});
				const { value = '' } = data;
				setResultSv24((r) => ({ ...r, old: value }));
			} catch (err: any) {
				console.log(err);
			}
		}
	};

	const handleResultBet24 = (random: string) => {
		if (random === '') return random;
		let result = `${Number(random) > 9 ? random : `0${random}`}`;
		let new_result = `${result}`.split('')[1];
		let obj_result = {
			c: Number(new_result) % 2 === 0,
			l: Number(new_result) % 2 !== 0,
			x: Number(new_result) < 5,
			t: Number(new_result) > 4,
			total: {
				CL: '',
				TX: '',
				result: `${result}`,
				XIEN: '',
			},
		};
		obj_result.total.CL = `${obj_result.c ? 'C' : 'L'}`;
		obj_result.total.TX = `${obj_result.t ? 'T' : 'X'}`;
		obj_result.total.XIEN = `${obj_result.total.CL}${obj_result.total.TX}`;
		return `${obj_result.total.XIEN}-${obj_result.total.result}`;
	};

	return (
		<div className="flex flex-col gap-2 w-full max-w-7xl items-center justify-center -z-0">
			<div className="lg:grid lg:grid-cols-4 flex flex-wrap gap-5 font-medium font-chakra-petch">
				{game && game['1'] && <GameCard game={game['1']} />}
				{game && game['2'] && <GameCard game={game['2']} />}
				{game && game['3'] && <GameCard game={game['3']} />}
				{game && game['24'] && <GameCard game={game['24']} />}
			</div>
			{/* Func  search/filter userBet & Func change result sv 24*/}
			<div className="flex flex-col gap-5 p-2 w-full">
				<div className="flex flex-col gap-2">
					<div className="flex flex-row gap-2 items-center">
						<button
							className="btn btn-outline"
							onClick={handlerGetResultSv24}>
							Lấy Kết Quả 24
						</button>
						<p>Kết quả 24: {handleResultBet24(resultSv24.old)}</p>
					</div>
					<form
						className="flex flex-row gap-2 items-center"
						onSubmit={handlerChangeResultSv24}>
						<label className="input input-bordered flex items-center gap-2">
							<input
								type="text"
								className="grow"
								placeholder="Ex: Nhập kết quả"
								onChange={(e) =>
									setResultSv24((r) => ({ ...r, new: e.target.value }))
								}
							/>
						</label>
						<button
							className="btn btn-outline"
							type="submit">
							Đổi Kết Quả
						</button>
					</form>
				</div>
				{/* Func Filter Sv/Search*/}
				<div className="flex lg:flex-row flex-wrap gap-2 items-end justify-start">
					<label className="form-control w-full max-w-20">
						<div className="label">
							<span className="label-text">Server</span>
						</div>
						<select
							className="select select-bordered"
							onChange={handlerServerFilter}>
							<option
								selected
								value={'all'}>
								All
							</option>
							<option value={'1'}>1</option>
							<option value={'2'}>2</option>
							<option value={'3'}>3</option>
							<option value={'24'}>24</option>
						</select>
					</label>
					<form
						className="flex flex-row gap-2 items-center"
						onSubmit={handlerSearch}>
						<label className="input input-bordered flex items-center gap-2">
							<input
								type="text"
								className="grow"
								placeholder="Ex: Web Lỏ"
								onChange={(e) => setSearch(e.target.value)}
							/>
						</label>
						<button
							className="btn btn-outline"
							type="submit">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								className="h-4 w-4 opacity-70">
								<path
									fillRule="evenodd"
									d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
									clipRule="evenodd"
								/>
							</svg>
							Tìm
						</button>
					</form>
				</div>
				{/* List userBet */}
				<div className="overflow-auto max-h-[400px] w-full border border-current">
					<table className="table table-pin-rows table-pin-cols">
						{/* head */}
						<thead className="text-sm  text-center">
							<tr>
								<th className="border border-current">
									<div className="flex flex-row items-center justify-center gap-2"></div>
								</th>
								<th className="border border-current">
									<div className="flex flex-row items-center justify-center gap-2">
										Nhân Vật
									</div>
								</th>
								<th className="border border-current">
									<div className="flex flex-row items-center justify-center gap-2">
										Gold Cược
									</div>
								</th>
								<th className="border border-current">
									<div className="flex flex-row items-center justify-center gap-2">
										Dự Đoán
									</div>
								</th>
								<th className="border border-current">
									<div className="flex flex-row items-center justify-center gap-2">
										Kết Quả
									</div>
								</th>
								<th className="border border-current">
									<div className="flex flex-row items-center justify-center gap-2">
										Gold Nhận
									</div>
								</th>
								<th className="border border-current">
									<div className="flex flex-row items-center justify-center gap-2">
										Tình Trạng
									</div>
								</th>
								<th className="border border-current">
									<div className="flex flex-row items-center justify-center gap-2">
										Thời gian
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							{userBets &&
								userBets.length > 0 &&
								userBets
									.filter(
										(ub) =>
											ub._id && [ub.server, 'all'].includes(filter.server),
									)
									.filter((ub) => ub.name.includes(filter.name ?? ''))
									.sort(
										(a, b) =>
											moment(b.createdAt).unix() - moment(a.createdAt).unix(),
									)
									.map((ub) => (
										<UserBetRow
											userBet={ub}
											key={ub._id}
										/>
									))}
						</tbody>
					</table>
				</div>
			</div>
			<NoticeModel id="notice_change_result">
				<p className="py-4">Bạn đã đổi kết quả thành công!</p>
			</NoticeModel>
		</div>
	);
}

const GameCard = ({ game }: { game: LiveGame }) => {
	const status = game.isEnd;
	const server = game.server;
	const result = JSON.parse(game.resultUser) as ResultUser;
	const resultSv =
		game.result === ''
			? 'Chưa có kết quả'
			: game.result === '1'
			? 'Đen'
			: game.result === '0'
			? 'Đỏ'
			: game.result;

	const [time, setTime] = useState(0);

	useEffect(() => {
		const timeEnd = moment(game.timeEnd).unix();
		const now = moment().unix();
		setTime(Math.floor(timeEnd - now));

		const interval = setInterval(() => {
			const now = moment().unix();
			const remainingTime = Math.floor(timeEnd - now);
			setTime(remainingTime);
		}, 1000);

		return () => clearInterval(interval);
	}, [game.timeEnd]);

	return (
		<div
			className="border rounded-lg bg-white shadow-lg flex flex-col p-4 gap-2"
			key={game._id}>
			<div className="flex flex-col gap-2 items-start justify-start">
				<h1>Server - {server}</h1>
				<div className="flex flex-row gap-2 items-center">
					<h3>Status: {status ? 'Đã kết thúc' : 'Đang hoạt động'}</h3>
					<span className="relative flex h-3 w-3">
						<span
							className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
								status ? 'bg-red-400' : 'bg-green-400'
							} opacity-75`}></span>
						<span
							className={`relative inline-flex rounded-full h-3 w-3 ${
								status ? 'bg-red-500' : 'bg-green-500'
							}`}></span>
					</span>
				</div>
			</div>
			<div className="flex flex-col items-start gap-2">
				<h1>Mã phiên: {game._id}</h1>
				<p>Kết quả: {resultSv}</p>
				{server === '24' && (
					<div className="flex flex-col">
						{/* Chẳn lẻ */}
						<div className="flex flex-row gap-2 items-start">
							<p className="">Chẵn: {result.c ?? 0}</p>
							<p className="">Lẻ: {result.l ?? 0}</p>
						</div>
						{/* Tài xỉu */}
						<div className="flex flex-row gap-2 items-start">
							<p className="">Tài: {result.t ?? 0}</p>
							<p className="">Xỉu: {result.x ?? 0}</p>
						</div>
					</div>
				)}
				{server !== '24' && (
					<div className="flex flex-col">
						{/* Đen Đỏ */}
						<div className="flex flex-row gap-2 items-start">
							<p className="">Đỏ: {result[0] ?? 0}</p>
							<p className="">Đen: {result[1] ?? 0}</p>
						</div>
					</div>
				)}
				<p>Thời gian còn lại: {time > 0 ? `${time} giây` : 'Hết giờ'}</p>
			</div>
		</div>
	);
};

const UserBetRow = ({ userBet }: { userBet: UserBetData }) => {
	const { server, name, amount, isEnd, receive, result, resultBet, updatedAt } =
		userBet;
	let new_result = result in TranslateKey ? TranslateKey[`${result}`] : result;
	let new_resultBet = !resultBet
		? userBet?.resultBet
		: resultBet[0] in TranslateKey
		? TranslateKey[`${resultBet[0]}`]
		: resultBet[0];
	return (
		<tr className="hover">
			<td className="border border-current">{server}</td>
			<td className="border border-current">{name}</td>
			<td className="border border-current">{amount}</td>
			<td className="border border-current">{new_result ?? result ?? ''}</td>
			<td className="border border-current">
				{new_resultBet && !['1', '2', '3'].includes(server)
					? `${resultBet}`
					: resultBet === '0'
					? 'Khỉ Đỏ'
					: resultBet === '1'
					? 'Khỉ Đen'
					: ''}
			</td>
			<td className="border border-current">{receive}</td>
			<td className="border border-current">
				{isEnd && receive > 0 ? (
					'Đã Thanh Toán'
				) : !isEnd ? (
					<span className="loading loading-dots loading-sm"></span>
				) : (
					'Đã Thua'
				)}
			</td>
			<td className="border border-current">
				{moment(updatedAt).format('DD/MM/YYYY HH:mm:ss')}
			</td>
		</tr>
	);
};
