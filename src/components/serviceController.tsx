'use client';

import { useAppSelector } from '@/lib/redux/hook';
import apiClient from '@/lib/server/apiClient';
import { useSocket } from '@/lib/server/socket';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { GiDragonShield } from 'react-icons/gi';
import { IoMdAddCircleOutline } from 'react-icons/io';
import NoticeModel from './model/notice';

interface ResultListServiceV3 {
	page: number;
	limit: number;
	total: number;
	totalPage: number;
	data: ServiceData[] | [];
	error?: string;
}

interface ConfigPage {
	page: number;
	limit: number;
	total: number;
	totalPage: number;
	server: string; // Server
	type: string; // Type service
	gold: string; // Sắp xếp theo Gold
	playerName: string; // Tìm tên hiển thị
	uid: string; // Tìm tên hiển thị
	startDate: string; // Tìm tên hiển thị
	endDate: string; // Tìm tên hiển thị
}

interface OrderField {
	server: string;
	playerName: string;
	type: '1' | '0';
	amount: number;
	name: string;
}

export default function ServiceController() {
	const owner = useAppSelector((state) => state.user);
	const [services, setService] = useState<ServiceData[]>([]);
	const [pageInfo, setPage] = useState<ConfigPage>({
		limit: 10,
		page: 1,
		total: 0,
		totalPage: 0,
		server: 'all', // Server
		type: 'all', // Server
		gold: 'all', // Sắp xếp theo Gold
		playerName: '', // Tìm tên hiển thị
		uid: '', // Tìm tên hiển thị
		startDate: '', // Tìm tên hiển thị
		endDate: '', // Tìm tên hiển thị
	});
	const [order, setOrder] = useState<OrderField>({
		amount: 0,
		playerName: '',
		server: '',
		type: '0',
		name: '',
	});

	// Socket
	const socket = useSocket();
	// Hàm thay đổi giá trị bộ lọc
	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setPage((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}));
	};
	// Hàm thay đổi giá trị Order
	const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setOrder((prevFilters) => ({
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
			const { data }: { data: ResultListServiceV3 } = await apiClient.get(
				`/session/v3/list/services?${queryParams}`,
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
			setService(data.data);
		} catch (err: any) {
			console.log(err);
		}
	};

	// Hàm gọi Order (Service)
	const handlerOrder = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const { data } = await apiClient.post('/session/v3/create', order, {
				headers: {
					Authorization: `Bearer ${owner.token}`,
				},
			});
			if (data === 'ok') {
				let dialog = document.getElementById(
					'add-service',
				) as HTMLDialogElement;
				if (dialog) {
					dialog.close();
				}
			}
		} catch (err: any) {
			console.log(err);
		}
	};

	const showOrder = () => {
		let dialog = document.getElementById('add-service') as HTMLDialogElement;
		if (dialog) {
			dialog.show();
		}
	};

	// Hook Auto get old data
	useEffect(() => {
		const getListServices = async (token: string) => {
			try {
				const { data }: { data: ResultListServiceV3 } = await apiClient.get(
					'/session/v3/list/services',
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				const { data: updateServices, limit, page, total, totalPage } = data;
				setPage((p) => ({ ...p, limit, page, total, totalPage }));
				setService(updateServices);
			} catch (err: any) {}
		};
		if (owner.isLogin) {
			getListServices(owner.token ?? '');
		}
	}, [owner]);

	// Hook Auto update Service
	useEffect(() => {
		socket.on('session-res', (data: ServiceData) => {
			setService((s) => s.map((prev) => (prev._id === data._id ? data : prev)));
		});
		socket.on('session-ce', (data: ServiceData) => {
			setService((s) => {
				// Loại bỏ phần tử cuối và thêm phần tử mới vào đầu
				const updatedService = [data, ...s.slice(0, s.length - 1)];
				return updatedService;
			});
		});
		return () => {
			socket.off('session-res');
			socket.off('session-ce');
		};
	}, [socket]);

	return (
		<div className="flex flex-col gap-2 w-full max-w-7xl items-center justify-center -z-0">
			<div className="flex lg:flex-row flex-wrap gap-2 items-center w-full">
				<GiDragonShield size={34} />
				<h1 className="font-protest-strike-regular uppercase text-2xl">
					Quản lý giao dịch
				</h1>
				<div className="flex flex-row gap-2 items-center">
					<p>(Live)</p>
					<span className="relative flex h-3 w-3">
						<span
							className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75`}></span>
						<span
							className={`relative inline-flex rounded-full h-3 w-3 bg-green-500`}></span>
					</span>
				</div>
			</div>
			{/* Func */}
			<div className="flex lg:flex-row flex-wrap w-full gap-2 items-end justify-start">
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
						<span className="label-text">Loại</span>
					</div>
					<select
						value={pageInfo.type}
						onChange={handleFilterChange}
						name="type"
						className="select select-bordered">
						<option
							selected
							value={'all'}>
							All
						</option>
						<option value={'1'}>Rút</option>
						<option value={'0'}>Nạp</option>
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
				<label className="form-control w-full lg:max-w-xs max-w-40">
					<div className="label">
						<span className="label-text">Tìm theo UID</span>
					</div>
					<input
						type="text"
						placeholder="66f57...cecb"
						className="input input-bordered w-full lg:max-w-xs max-w-40"
						name="uid"
						onChange={(e) =>
							setPage((prevFilters) => ({
								...prevFilters,
								uid: e.target.value,
							}))
						}
					/>
				</label>
				<label className="form-control w-full lg:max-w-xs max-w-40">
					<div className="label">
						<span className="label-text">Tìm theo Tên nhân vật</span>
					</div>
					<input
						type="text"
						placeholder="Tên nhân vật"
						className="input input-bordered w-full lg:max-w-xs max-w-40"
						name="playerName"
						onChange={(e) =>
							setPage((prevFilters) => ({
								...prevFilters,
								playerName: e.target.value,
							}))
						}
					/>
				</label>
				<label className="form-control w-full lg:max-w-xs max-w-40">
					<div className="label">
						<span className="label-text">Từ</span>
					</div>
					<input
						type="date"
						className="input input-bordered w-full lg:max-w-xs max-w-40"
						name="startDate"
						onChange={(e) =>
							setPage((prevFilters) => ({
								...prevFilters,
								startDate: e.target.value,
							}))
						}
					/>
				</label>
				<label className="form-control w-full lg:max-w-xs max-w-40">
					<div className="label">
						<span className="label-text">Đến</span>
					</div>
					<input
						type="date"
						className="input input-bordered w-full lg:max-w-xs max-w-40"
						name="endtDate"
						onChange={(e) =>
							setPage((prevFilters) => ({
								...prevFilters,
								endDate: e.target.value,
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
					Lọc
				</button>
			</div>
			{/* Thao tác nhanh */}
			<div className="flex lg:flex-row flex-wrap w-full gap-2 items-end justify-start">
				<button
					className="btn btn-outline"
					onClick={showOrder}>
					<IoMdAddCircleOutline />
					Tạo Giao Dịch
				</button>
			</div>
			<div className="overflow-auto max-h-[600px] w-full border border-current">
				<table className="table table-pin-rows">
					{/* head */}
					<thead className="text-sm text-center capitalize">
						<tr>
							<th className="text-black font-normal border border-current">
								STT
							</th>
							<th className="text-black font-normal border border-current">
								Máy chủ
							</th>
							<th className="text-black font-normal border border-current">
								Tên nhân vật
							</th>
							<th className="text-black font-normal border border-current">
								UID
							</th>
							<th className="text-black font-normal border border-current">
								Loại
							</th>
							<th className="text-black font-normal border border-current">
								Số Vàng
							</th>
							<th className="text-black font-normal border border-current">
								Thực nhận
							</th>
							<th className="text-black font-normal border border-current">
								Trạng thái
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
						{services &&
							services.length > 0 &&
							services.map((s, i) => (
								<ServiceRow
									service={s}
									token={owner.token ?? ''}
									index={i}
									key={s._id}
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
			<NoticeModel
				id="add-service"
				heading="Tạo Giao Dịch">
				<form
					onSubmit={handlerOrder}
					className="flex flex-col gap-2 items-center justify-center w-full">
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Chọn máy chủ</span>
						</div>
						<select
							onChange={handleOrderChange}
							name="server"
							className="select select-bordered">
							<option
								disabled
								selected>
								Chọn Máy Chủ
							</option>
							<option value={'1'}>Máy chủ 1</option>
							<option value={'2'}>Máy chủ 2</option>
							<option value={3}>Máy chủ 3</option>
						</select>
					</label>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Chọn giao dịch</span>
						</div>
						<select
							onChange={handleOrderChange}
							name="type"
							className="select select-bordered">
							<option
								disabled
								selected>
								Chọn giao dịch
							</option>
							<option value={'0'}>Nạp</option>
							<option value={'1'}>Rút</option>
						</select>
					</label>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Nhập tên nhân vật</span>
						</div>
						<input
							type="text"
							placeholder="Tên nhân vật"
							className="input input-bordered w-full max-w-xs"
							onChange={(e) => {
								setOrder((f) => ({
									...f,
									playerName: e.target.value,
								}));
							}}
						/>
					</label>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Nhập Tên hiển thị</span>
						</div>
						<input
							type="text"
							placeholder="Tên hiển thị"
							className="input input-bordered w-full max-w-xs"
							onChange={(e) => {
								// Extract numeric part (removes any non-digit characters)
								setOrder((f) => ({
									...f,
									name: e.target.value,
								}));
							}}
						/>
					</label>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Số vàng giao dịch</span>
						</div>
						<input
							type="text"
							placeholder="Nhập số vàng"
							className="input input-bordered w-full max-w-xs"
							onChange={(e) => {
								// Extract numeric part (removes any non-digit characters)
								let value = getNumbetFromString(e.target.value);
								let new_value = value.split(/[,.]/g).join('');
								setOrder((f) => ({
									...f,
									amount: parseInt(new_value.toString(), 10),
								}));
								e.target.value = value;
							}}
						/>
					</label>
					<button
						type="submit"
						className="btn btn-outline btn-sm w-full max-w-xs">
						Tạo
					</button>
				</form>
			</NoticeModel>
		</div>
	);
}

const ServiceRow = ({
	service,
	token,
	index,
}: {
	service: ServiceData;
	token: string;
	index: number;
}) => {
	const {
		amount,
		createdAt,
		playerName,
		recive,
		server,
		status,
		type,
		uid,
		updatedAt,
	} = service;
	const typeConvert = type === '0' ? 'Nạp thỏi vàng' : 'Rút thỏi vàng';
	const statusConvert =
		status === '1'
			? 'Hủy giao dịch'
			: status === '0'
			? 'Đang giao dịch'
			: 'Giao dịch thành công';
	const amountConvert = getNumbetFromString(amount.toString());
	const reciveConvert = getNumbetFromString(recive.toString());

	// Hàm hủy giao dịch người dùng
	const showQuestionCancelOrder = () => {
		let dialog = document.getElementById(
			`${service._id}cancel-order`,
		) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
		}
	};

	const handlerOrderCancel = async () => {
		try {
			const { data } = await apiClient.post(
				'/session/v3/cancel',
				{
					sessionId: service._id,
					uid: service.uid,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			if (data === 'ok') {
				let dialog = document.getElementById(
					`${service._id}cancel-order`,
				) as HTMLDialogElement;
				if (dialog) {
					dialog.close();
				}
			}
		} catch (err: any) {
			console.log(err);
		}
	};
	return (
		<>
			<tr className="text-nowrap">
				<td className="border border-current">{index + 1}</td>
				<td className="border border-current">{server}</td>
				<td className="border border-current">{playerName}</td>
				<td className="border border-current">{uid}</td>
				<td className="border border-current">{typeConvert}</td>
				<td className="border border-current">{amountConvert}</td>
				<td className="border border-current">{reciveConvert}</td>
				<td className="border border-current">{statusConvert}</td>
				<td className="border border-current">
					{moment(createdAt).format('DD/MM/YYYY HH:mm:ss')}
				</td>
				<td className="border border-current">
					{moment(updatedAt).format('DD/MM/YYYY HH:mm:ss')}
				</td>
			</tr>
			<NoticeModel
				id={`${service._id}cancel-order`}
				heading="Hủy Giao Dịch">
				<div className="flex flex-col gap-2 w-full items-center justify-center">
					<h1>Bạn có muốn hủy giao dịch này không?</h1>
					<div className="flex flex-row gap-2">
						<button
							onClick={handlerOrderCancel}
							className="btn btn-outline btn-sm btn-success">
							Có
						</button>
						<button
							onClick={() => {
								let dialog = document.getElementById(
									`${service._id}cancel-order`,
								) as HTMLDialogElement;
								if (dialog) {
									dialog.close();
								}
							}}
							className="btn btn-outline btn-sm btn-error">
							Không
						</button>
					</div>
				</div>
			</NoticeModel>
		</>
	);
};

const getNumbetFromString = (value: string) => {
	let num = value.replace(/[^\d]/g, '');
	return num ? new Intl.NumberFormat().format(parseInt(num, 10)) : '';
};
