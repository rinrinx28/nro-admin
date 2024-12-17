'use client';
import { GiDragonShield } from 'react-icons/gi';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/lib/redux/hook';
import apiClient from '@/lib/server/apiClient';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);
interface DashboardData {
	_id: string;
	types: {
		type: string;
		totalRecive: number;
		totalTransactions: number;
	}[];
}

interface ChartProps {
	data: {
		_id: string;
		types: {
			type: string;
			totalRecive: number;
			totalTransactions: number;
		}[];
	}[];
}

const DashboardChart: React.FC<ChartProps> = ({ data }) => {
	// Xử lý dữ liệu cho biểu đồ
	const labels = data.map((item) => item._id); // Ngày/Tháng/Năm
	const totalDeposit = data.map(
		(item) => item.types.find((t) => t.type === '0')?.totalRecive || 0,
	); // Tổng số tiền nạp
	const totalWithdraw = data.map(
		(item) => item.types.find((t) => t.type === '1')?.totalRecive || 0,
	); // Tổng số tiền rút

	// Dữ liệu cho biểu đồ
	const chartData = {
		labels,
		datasets: [
			{
				label: 'Nạp Vàng',
				data: totalDeposit,
				backgroundColor: 'rgba(75, 192, 192, 0.5)',
			},
			{
				label: 'Rút Vàng',
				data: totalWithdraw,
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: false,
				text: 'Dashboard Nạp/Rút Vàng',
			},
		},
	};

	return (
		<div style={{ height: '300px', margin: '0 auto', width: '100%' }}>
			<Bar
				data={chartData}
				options={options}
			/>
		</div>
	);
};

export default function MoneyFlow() {
	const owner = useAppSelector((state) => state.user);
	const [data, setData] = useState<DashboardData[]>([]);
	const [filterType, setFilterType] = useState<
		'day' | 'month' | 'year' | 'range'
	>('day');
	const [fromDate, setFromDate] = useState('');
	const [toDate, setToDate] = useState('');

	const fetchDashboardData = async () => {
		try {
			const type = filterType;
			const from = fromDate;
			const to = toDate;
			let url = `/session/v3/dashboard/gold?type=${type}`;
			if (type === 'range' && from && to) {
				url += `&from=${from}&to=${to}`;
			}

			const { data } = await apiClient.get(url, {
				headers: {
					Authorization: `Bearer ${owner.token}`,
				},
			});
			setData(data);
		} catch (err: any) {
			console.log(err);
		}
	};

	useEffect(() => {
		const getDashboardDataGold = async (token: string) => {
			try {
				const { data } = await apiClient.get(
					'/session/v3/dashboard/gold?type=day',
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				setData(data);
			} catch (err: any) {
				console.log(err);
			}
		};
		if (owner.isLogin) {
			getDashboardDataGold(owner.token ?? '');
		}
	}, [owner]);

	return (
		<div className="flex flex-col gap-2 w-full max-w-7xl justify-start -z-0 ">
			<div className="flex lg:flex-row flex-wrap gap-2 items-center w-full bg-white rounded-lg p-2">
				<GiDragonShield size={34} />
				<h1 className="font-protest-strike-regular uppercase text-2xl">
					Theo Dỏi Vàng
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
			{/* Total Nap/Rut Gold */}
			<div className="flex flex-col gap-2 w-full max-w-2xl justify-start items-start shadow-lg bg-white rounded-lg p-2">
				{/* Filter */}
				<div className="flex flex-wrap gap-4 w-full justify-start items-center">
					<select
						value={filterType}
						onChange={(e) =>
							setFilterType(
								e.target.value as 'day' | 'month' | 'year' | 'range',
							)
						}
						className="select select-bordered">
						<option value="day">Ngày</option>
						<option value="month">Tháng</option>
						<option value="year">Năm</option>
						<option value="range">Từ ngày - Đến ngày</option>
					</select>

					{/* Nếu filter là 'range', hiển thị input ngày */}
					{filterType === 'range' && (
						<>
							<input
								type="date"
								value={fromDate}
								onChange={(e) => setFromDate(e.target.value)}
								className="input input-bordered"
							/>
							<input
								type="date"
								value={toDate}
								onChange={(e) => setToDate(e.target.value)}
								className="input input-bordered"
							/>
						</>
					)}

					<button
						className="btn btn-outline"
						onClick={fetchDashboardData}>
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
				<DashboardChart data={data} />
			</div>
		</div>
	);
}
