'use client';

import NoticeModel from '@/components/model/notice';
import { useAppDispatch } from '@/lib/redux/hook';
import { updateUser } from '@/lib/redux/storage/user/user';
import apiClient from '@/lib/server/apiClient';
import { useRouter } from 'next/navigation';
import { FormEvent, use, useState } from 'react';
import { useDispatch } from 'react-redux';

interface Field {
	username?: string;
	password?: string;
}

export default function Home() {
	const [field, setField] = useState<Field>();
	const [msg, setMsg] = useState<string>('');
	const router = useRouter();
	const dispatch = useAppDispatch();

	const showNotice = (message: string) => {
		let dialog = document.getElementById('notice_login') as HTMLDialogElement;
		if (dialog) {
			setMsg(message);
			dialog.show();
		}
	};

	const login = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const { data } = await apiClient.post('/auth/login', field);
			const { access_token, ...res } = data;
			const { role } = res;
			if (role !== '0') {
				router.push('/dashboard');
				localStorage.setItem('access_token', access_token);
				dispatch(updateUser({ ...res, isLogin: true, token: access_token }));
				return;
			}
			showNotice('Bạn không đủ quyền hạn');
		} catch (err: any) {
			showNotice(err.response.data.message.message);
		}
	};
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<div className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
				<div className="card lg:card-side bg-base-200 shadow-xl max-w-6xl w-full">
					<div
						className="w-[400px] h-96 bg-no-repeat bg-cover bg-center rounded-2xl"
						style={{
							backgroundImage: 'url("/image/background/logo_login.webp")',
						}}></div>
					<form
						onSubmit={login}
						className="card-body flex flex-col items-center justify-around">
						<h2 className="card-title text-current">Đăng Nhập</h2>

						<div className="flex flex-col gap-2">
							<label className="input input-bordered flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									className="h-4 w-4 opacity-70">
									<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
								</svg>
								<input
									type="text"
									className="grow"
									placeholder="Username"
									onChange={(e) =>
										setField((f) => ({ ...f, username: e.target.value }))
									}
								/>
							</label>
							<label className="input input-bordered flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									className="h-4 w-4 opacity-70">
									<path
										fillRule="evenodd"
										d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
										clipRule="evenodd"
									/>
								</svg>
								<input
									type="password"
									className="grow"
									placeholder="Type password"
									onChange={(e) =>
										setField((f) => ({ ...f, password: e.target.value }))
									}
								/>
							</label>
						</div>
						<div className="card-actions justify-end">
							<button
								type="submit"
								className="btn btn-primary">
								Đăng Nhập
							</button>
						</div>
					</form>
				</div>
			</div>
			<NoticeModel id="notice_login">
				<p>{msg}</p>
			</NoticeModel>
		</div>
	);
}
