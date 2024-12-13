'use client';

import { useAppSelector } from '@/lib/redux/hook';
import apiClient from '@/lib/server/apiClient';
import moment from 'moment';
import { useEffect, useState } from 'react';
import NoticeModel from './model/notice';

interface ResultListUserV3 {
	page: number;
	limit: number;
	total: number;
	totalPage: number;
	data: UserData[] | [];
	error?: string;
}

interface ConfigPage {
	page: number;
	limit: number;
	total: number;
	totalPage: number;
	server: string; // Server
	vip: string; // VIP
	gold: string; // Sắp xếp theo Gold
	deposit: string; // Sắp xếp theo Deposit
	withdraw: string; // Sắp xếp theo Withdraw
	totalBet: string; // Sắp xếp theo Total Bet
	search: string; // Tìm tên hiển thị
}

interface UserField {
	plus: number;
	minus: number;
	set: number;
}

export default function UserController() {
	const owner = useAppSelector((state) => state.user);
	const [users, setUser] = useState<UserData[]>([]);
	const [pageInfo, setPage] = useState<ConfigPage>({
		limit: 10,
		page: 1,
		total: 0,
		totalPage: 0,
		server: 'all', // Server
		vip: 'all', // VIP
		gold: 'all', // Sắp xếp theo Gold
		deposit: 'all', // Sắp xếp theo Deposit
		withdraw: 'all', // Sắp xếp theo Withdraw
		totalBet: 'all', // Sắp xếp theo Total Bet
		search: '', // Tìm tên hiển thị
	});
	// Hàm thay đổi giá trị bộ lọc
	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setPage((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}));
	};

	// Hàm di chuyển page
	const handlePageChange = async (newPage: number) => {
		try {
			const { total, totalPage, ...filter } = pageInfo;
			const queryParams = new URLSearchParams({
				...filter,
				page: newPage,
			} as any).toString();
			const { data }: { data: ResultListUserV3 } = await apiClient.get(
				`/user/v3/list/users?${queryParams}`,
				{
					headers: {
						Authorization: `Bearer ${owner.token}`,
					},
				},
			);
			const { limit, page } = data;
			setPage((p) => ({
				...p,
				limit,
				page,
				total: data.total,
				totalPage: data.totalPage,
			}));
			setUser(data.data);
		} catch (err: any) {
			console.log(err);
		}
	};
	useEffect(() => {
		const getListUserV3 = async () => {
			try {
				const { data }: { data: ResultListUserV3 } = await apiClient.get(
					'/user/v3/list/users',
					{
						headers: {
							Authorization: `Bearer ${owner.token}`,
						},
					},
				);
				const { limit, page, total, totalPage } = data;
				setPage((p) => ({ ...p, limit, page, total, totalPage }));
				setUser(data.data);
			} catch (err: any) {
				console.log(err);
			}
		};
		if (owner.isLogin) {
			getListUserV3();
		}
	}, [owner]);
	return (
		<div className="flex flex-col gap-2 w-full max-w-7xl items-center justify-center -z-0">
			{/* Func */}
			<div className="flex lg:flex-row flex-wrap gap-2 items-end justify-start">
				<label className="form-control w-fit">
					<div className="label">
						<span className="label-text">Hiển thị</span>
					</div>
					<select
						value={pageInfo.limit}
						onChange={handleFilterChange}
						name="limit"
						className="select select-bordered">
						<option
							selected
							value={'10'}>
							10 dòng
						</option>
						<option value={'25'}>25 dòng</option>
						<option value={'50'}>50 dòng</option>
						<option value={'100'}>100 dòng</option>
						<option value={'1000'}>1000 dòng</option>
					</select>
				</label>
				<label className="form-control w-fit">
					<div className="label">
						<span className="label-text">Server</span>
					</div>
					<select
						value={pageInfo.server}
						onChange={handleFilterChange}
						name="server"
						className="select select-bordered">
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
				<label className="form-control w-fit">
					<div className="label">
						<span className="label-text">VIP</span>
					</div>
					<select
						value={pageInfo.vip}
						onChange={handleFilterChange}
						name="vip"
						className="select select-bordered">
						<option
							selected
							value={'all'}>
							All
						</option>
						<option value={'1'}>1</option>
						<option value={'2'}>2</option>
						<option value={'3'}>3</option>
						<option value={'4'}>4</option>
						<option value={'5'}>5</option>
						<option value={'6'}>6</option>
						<option value={'7'}>7</option>
					</select>
				</label>
				<label className="form-control w-fit">
					<div className="label">
						<span className="label-text">Gold</span>
					</div>
					<select
						value={pageInfo.gold}
						onChange={handleFilterChange}
						name="gold"
						className="select select-bordered">
						<option
							selected
							value={'all'}>
							All
						</option>
						<option value={'asc'}>Tăng dần</option>
						<option value={'desc'}>Giảm dần</option>
					</select>
				</label>
				<label className="form-control w-fit">
					<div className="label">
						<span className="label-text">Deposit</span>
					</div>
					<select
						value={pageInfo.deposit}
						onChange={handleFilterChange}
						name="deposit"
						className="select select-bordered">
						<option
							selected
							value={'all'}>
							All
						</option>
						<option value={'asc'}>Tăng dần</option>
						<option value={'desc'}>Giảm dần</option>
					</select>
				</label>
				<label className="form-control w-fit">
					<div className="label">
						<span className="label-text">Withdraw</span>
					</div>
					<select
						value={pageInfo.withdraw}
						onChange={handleFilterChange}
						name="withdraw"
						className="select select-bordered">
						<option
							selected
							value={'all'}>
							All
						</option>
						<option value={'asc'}>Tăng dần</option>
						<option value={'desc'}>Giảm dần</option>
					</select>
				</label>
				<label className="form-control w-fit">
					<div className="label">
						<span className="label-text">totalBet</span>
					</div>
					<select
						value={pageInfo.totalBet}
						onChange={handleFilterChange}
						name="totalBet"
						className="select select-bordered">
						<option
							selected
							value={'all'}>
							All
						</option>
						<option value={'asc'}>Tăng dần</option>
						<option value={'desc'}>Giảm dần</option>
					</select>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					<input
						name="search"
						type="text"
						className="grow"
						placeholder="Ex: Web Lỏ"
						onChange={(e) =>
							setPage((prevFilters) => ({
								...prevFilters,
								search: e.target.value,
							}))
						}
					/>
				</label>
				<button
					className="btn btn-outline"
					onClick={() => handlePageChange(1)}>
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
			</div>
			<div className="overflow-auto max-h-[600px] w-full border border-current">
				<table className="table table-pin-rows">
					{/* head */}
					<thead className="text-sm text-center capitalize">
						<tr>
							<th className="text-black font-normal border border-current"></th>
							<th className="text-black font-normal border border-current">
								Tên tài khoản
							</th>
							<th className="text-black font-normal border border-current">
								Tên hiển thị
							</th>
							<th className="text-black font-normal border border-current">
								Mật khẩu
							</th>
							<th className="text-black font-normal border border-current">
								Email
							</th>
							<th className="text-black font-normal border border-current">
								Gold
							</th>
							<th className="text-black font-normal border border-current">
								Diamon (Lục Bảo)
							</th>
							<th className="text-black font-normal border border-current">
								ClanId
							</th>
							<th className="text-black font-normal border border-current">
								TotalBet
							</th>
							<th className="text-black font-normal border border-current">
								limitedTrade
							</th>
							<th className="text-black font-normal border border-current">
								trade
							</th>
							<th className="text-black font-normal border border-current">
								totalBank
							</th>
							<th className="text-black font-normal border border-current">
								vip
							</th>
							<th className="text-black font-normal border border-current">
								totalClan
							</th>
							<th className="text-black font-normal border border-current">
								deposit
							</th>
							<th className="text-black font-normal border border-current">
								withdraw
							</th>
							<th className="text-black font-normal border border-current">
								createdAt
							</th>
							<th className="text-black font-normal border border-current">
								updatedAt
							</th>
						</tr>
					</thead>
					<tbody>
						{users &&
							users.length > 0 &&
							users.map((u) => (
								<UserRow
									user={u}
									token={owner.token}
									setUser={setUser}
									key={u._id}
								/>
							))}
					</tbody>
				</table>
			</div>
			<div className="flex justify-end w-full">
				<div className="join">
					<button
						disabled={pageInfo.page === 1}
						onClick={() => handlePageChange(pageInfo.page - 1)}
						className="join-item btn">
						«
					</button>
					<button className="join-item btn">
						Page {pageInfo.page}/{pageInfo.totalPage}
					</button>
					<button
						disabled={pageInfo.page >= pageInfo.totalPage}
						onClick={() => handlePageChange(pageInfo.page + 1)}
						className="join-item btn">
						»
					</button>
				</div>
			</div>
		</div>
	);
}

const UserRow = ({
	user,
	token,
	setUser,
}: {
	user: UserData;
	token: string | undefined;
	setUser: any;
}) => {
	const [field, setField] = useState<UserField>({
		minus: 0,
		plus: 0,
		set: 0,
	});
	const {
		username,
		name,
		pwd_h,
		email,
		gold,
		diamon,
		clan,
		totalBet,
		totalBank,
		totalClan,
		limitedTrade,
		trade,
		vip,
		deposit,
		withdraw,
		createdAt,
		updatedAt,
		server,
	} = user;
	const clanObj = JSON.parse(clan);
	//TODO ———————————————[Handler Dialog]———————————————
	const showOptionUser = () => {
		let dialog = document.getElementById(`${user._id}`) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
		}
	};

	const showPlusGold = () => {
		let dialog = document.getElementById(
			`${user._id}-plus-gold`,
		) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
		}
	};

	const showMinusGold = () => {
		let dialog = document.getElementById(
			`${user._id}-minus-gold`,
		) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
		}
	};

	const showSetGold = () => {
		let dialog = document.getElementById(
			`${user._id}-set-gold`,
		) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
		}
	};

	const showBan = () => {
		let dialog = document.getElementById(
			`${user._id}-ban`,
		) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
		}
	};

	const showUnBan = () => {
		let dialog = document.getElementById(
			`${user._id}-unban`,
		) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
		}
	};

	const showDelete = () => {
		let dialog = document.getElementById(
			`${user._id}-delete`,
		) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
		}
	};

	//TODO ———————————————[Handler Func User]———————————————

	const handlerGold = async (type: 'plus' | 'minus' | 'set') => {
		try {
			const { minus, plus, set } = field;

			// Tạo một đối tượng để ánh xạ endpoint và giá trị
			const endpointMap = {
				plus: '/user/v3/gold/plus',
				minus: '/user/v3/gold/minus',
				set: '/user/v3/gold/set',
			};

			const amountMap = {
				plus: parseInt(plus.toString(), 10),
				minus: parseInt(minus.toString(), 10),
				set: parseInt(set.toString(), 10),
			};

			// Xác định endpoint và amount dựa vào type
			const endpoint = endpointMap[type];
			const amount = amountMap[type];

			// Gửi yêu cầu API
			const { data } = await apiClient.post(
				endpoint,
				{ uid: user._id, amount },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			const { message, user: updatedUser } = data;

			if (message === 'ok') {
				// Đóng dialog tương ứng
				const dialogId = `${user._id}-${type}-gold`;
				const dialog = document.getElementById(dialogId) as HTMLDialogElement;
				if (dialog) {
					dialog.close();
				}

				// Cập nhật danh sách người dùng
				setUser((prevUsers: UserData[]) =>
					prevUsers.map((u) => (u._id === updatedUser._id ? updatedUser : u)),
				);
			}
		} catch (err: any) {
			console.error('Error handling gold operation:', err);
		}
	};

	const handleBan = async () => {
		try {
			let inputReason = document.getElementById(
				`${user._id}-ban-reason`,
			) as HTMLInputElement;
			let reason = inputReason.value;
			const { data } = await apiClient.post(
				'/user/v3/ban',
				{
					uid: user._id,
					reason,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			const { message, user: updatedUser } = data;
			if (message === 'ok') {
				let dialog = document.getElementById(
					`${user._id}-ban`,
				) as HTMLDialogElement;
				if (dialog) {
					dialog.close();
				}
				// Cập nhật danh sách người dùng
				setUser((prevUsers: UserData[]) =>
					prevUsers.map((u) => (u._id === updatedUser._id ? updatedUser : u)),
				);
			}
		} catch (err: any) {}
	};

	const handleUnBan = async () => {
		try {
			let inputReason = document.getElementById(
				`${user._id}-unban-reason`,
			) as HTMLInputElement;
			let reason = inputReason.value;
			const { data } = await apiClient.post(
				'/user/v3/unban',
				{
					uid: user._id,
					reason,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			const { message, user: updatedUser } = data;
			if (message === 'ok') {
				let dialog = document.getElementById(
					`${user._id}-unban`,
				) as HTMLDialogElement;
				if (dialog) {
					dialog.close();
				}
				// Cập nhật danh sách người dùng
				setUser((prevUsers: UserData[]) =>
					prevUsers.map((u) => (u._id === updatedUser._id ? updatedUser : u)),
				);
			}
		} catch (err: any) {}
	};

	const handleDelete = async () => {
		try {
			const { data } = await apiClient.post(
				'/user/v3/delete',
				{
					uid: user._id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			const { message } = data;
			if (message === 'ok') {
				let dialog = document.getElementById(
					`${user._id}-delete`,
				) as HTMLDialogElement;
				if (dialog) {
					dialog.close();
				}
				// Cập nhật danh sách người dùng
				setUser((prevUsers: UserData[]) =>
					prevUsers.filter((u) => u._id !== user._id),
				);
			}
		} catch (err: any) {}
	};

	return (
		<>
			<tr className="text-nowrap">
				<td className="border border-current">
					<button
						className="btn bg-yellow-500"
						onClick={showOptionUser}>
						{server}
					</button>
				</td>
				<td className="border border-current">{username}</td>
				<td className="border border-current">{name}</td>
				<td className="border border-current">{pwd_h}</td>
				<td className="border border-current">{email}</td>
				<td className="border border-current">{gold}</td>
				<td className="border border-current">{diamon}</td>
				<td className="border border-current">
					{clanObj['clanId'] ?? 'Không có Clan'}
				</td>
				<td className="border border-current">{totalBet}</td>
				<td className="border border-current">{limitedTrade}</td>
				<td className="border border-current">{trade}</td>
				<td className="border border-current">{totalBank}</td>
				<td className="border border-current">{vip}</td>
				<td className="border border-current">{totalClan ?? 0}</td>
				<td className="border border-current">{deposit}</td>
				<td className="border border-current">{withdraw}</td>
				<td className="border border-current">
					{moment(createdAt).format('DD/MM/YYYY HH:mm:ss')}
				</td>
				<td className="border border-current">
					{moment(updatedAt).format('DD/MM/YYYY HH:mm:ss')}
				</td>
			</tr>
			<NoticeModel
				id={`${user._id}`}
				heading="Thông Tin Người Dùng">
				<div className="flex flex-col gap-2">
					<p>
						{username} - {name} - Server: {server}
					</p>
					<p>IP: {user.ip_address}</p>
					<p>Gold: {gold}</p>
					<p>
						Banned: {!user.isBan ? 'Chưa' : `Đã Ban - Lý Do: ${user.isReason}`}
					</p>
					<p>Thao tác nhanh</p>
					<div className="flex flex-wrap gap-4">
						<button
							className="btn btn-success btn-sm"
							onClick={showPlusGold}>
							Cộng vàng
						</button>
						<button
							className="btn btn-warning btn-sm"
							onClick={showMinusGold}>
							Trừ vàng
						</button>
						<button
							className="btn btn-sm"
							onClick={showSetGold}>
							Chỉnh vàng
						</button>
					</div>
					<div className="flex flex-row gap-4">
						{user.isBan && (
							<button
								className="btn btn-success btn-sm"
								onClick={showUnBan}>
								Gỡ Cấm tài khoản
							</button>
						)}
						{!user.isBan && (
							<button
								className="btn btn-error btn-sm"
								onClick={showBan}>
								Cấm tài khoản
							</button>
						)}
						<button
							className="btn btn-error btn-sm"
							onClick={showDelete}>
							Xóa tài khoản
						</button>
					</div>
				</div>
			</NoticeModel>
			<NoticeModel
				id={`${user._id}-plus-gold`}
				heading={`Cộng Vàng - ${user.name}`}>
				<div className="flex flex-col gap-2">
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Số vàng cộng</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							onChange={(e) => {
								// Extract numeric part (removes any non-digit characters)
								let value = getNumbetFromString(e.target.value);
								let new_value = value.split(/[,.]/g).join('');
								setField((f) => ({
									...f,
									plus: parseInt(new_value.toString(), 10),
								}));
								e.target.value = value;
							}}
							className="outline-none border-0 z-10 w-full py-3 px-2 bg-transparent font-bold"
						/>
					</label>
					<button
						className="btn btn-success btn-sm"
						onClick={() => handlerGold('plus')}>
						Cộng vàng
					</button>
				</div>
			</NoticeModel>
			<NoticeModel
				id={`${user._id}-minus-gold`}
				heading={`Trừ Vàng - ${user.name}`}>
				<div className="flex flex-col gap-2">
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Số vàng trừ</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							onChange={(e) => {
								// Extract numeric part (removes any non-digit characters)
								let value = getNumbetFromString(e.target.value);
								let new_value = value.split(/[,.]/g).join('');
								setField((f) => ({
									...f,
									minus: parseInt(new_value.toString(), 10),
								}));
								e.target.value = value;
							}}
							className="outline-none border-0 z-10 w-full py-3 px-2 bg-transparent font-bold"
						/>
					</label>
					<button
						className="btn btn-warning btn-sm"
						onClick={() => handlerGold('minus')}>
						Trừ vàng
					</button>
				</div>
			</NoticeModel>
			<NoticeModel
				id={`${user._id}-set-gold`}
				heading={`Chỉnh vàng - ${user.name}`}>
				<div className="flex flex-col gap-2">
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Số vàng chỉnh</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							onChange={(e) => {
								// Extract numeric part (removes any non-digit characters)
								let value = getNumbetFromString(e.target.value);
								let new_value = value.split(/[,.]/g).join('');
								setField((f) => ({
									...f,
									set: parseInt(new_value.toString(), 10),
								}));
								e.target.value = value;
							}}
							className="outline-none border-0 z-10 w-full py-3 px-2 bg-transparent font-bold"
						/>
					</label>
					<button
						className="btn btn-sm"
						onClick={() => handlerGold('set')}>
						Chỉnh vàng
					</button>
				</div>
			</NoticeModel>
			<NoticeModel
				id={`${user._id}-ban`}
				heading={`Cấm Tài Khoản - ${name}`}>
				<div className="flex flex-col gap-2">
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Lý do</span>
						</div>
						<input
							id={`${user._id}-ban-reason`}
							type="text"
							placeholder="Type here"
							className="outline-none border-0 z-10 w-full py-3 px-2 bg-transparent font-bold"
						/>
					</label>
					<button
						className="btn btn-error btn-sm"
						onClick={handleBan}>
						Cấm tài khoản
					</button>
				</div>
			</NoticeModel>
			<NoticeModel
				id={`${user._id}-unban`}
				heading={`Gỡ Cấm Tài Khoản - ${name}`}>
				<div className="flex flex-col gap-2">
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Lý do</span>
						</div>
						<input
							id={`${user._id}-unban-reason`}
							type="text"
							placeholder="Type here"
							className="outline-none border-0 z-10 w-full py-3 px-2 bg-transparent font-bold"
						/>
					</label>
					<button
						className="btn btn-error btn-sm"
						onClick={handleUnBan}>
						Gỡ Cấm tài khoản
					</button>
				</div>
			</NoticeModel>
			<NoticeModel
				id={`${user._id}-delete`}
				heading={`Xóa tài khoản - ${name}`}>
				<h2>Bạn có muốn xóa tài khoản này không?</h2>
				<div className="flex flex-row gap-2">
					<button
						className="btn btn-success btn-sm"
						onClick={handleDelete}>
						Xóa
					</button>
					<button
						className="btn btn-error btn-sm"
						onClick={() => {
							let dialog = document.getElementById(
								`${user._id}-delete`,
							) as HTMLDialogElement;
							if (dialog) {
								dialog.close();
							}
						}}>
						Không
					</button>
				</div>
			</NoticeModel>
		</>
	);
};

const getNumbetFromString = (value: string) => {
	let num = value.replace(/[^\d]/g, '');
	return num ? new Intl.NumberFormat().format(parseInt(num, 10)) : '';
};
