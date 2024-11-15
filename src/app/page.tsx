'use client';

import NoticeModel from '@/components/model/notice';
import { useAppDispatch } from '@/lib/redux/hook';
import { updateUser } from '@/lib/redux/storage/user/user';
import apiClient from '@/lib/server/apiClient';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

interface Field {
	username?: string;
	password?: string;
}

export default function Home() {
	const [isLoad, setIsLoad] = useState<boolean>(false);
	const [isRemember, setRemember] = useState<boolean>(true);
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
			setIsLoad(true);
			const { data } = await apiClient.post('/auth/login', field);
			const { access_token, ...res } = data;
			const { role } = res;
			if (role !== '0') {
				router.push('/dashboard');
				// save token if is Remember
				if (isRemember) {
					localStorage.setItem('access_token', access_token);
				}
				dispatch(updateUser({ ...res, isLogin: true, token: access_token }));
				return;
			}
			showNotice('Bạn không đủ quyền hạn');
		} catch (err: any) {
			showNotice(err.response.data.message.message);
		} finally {
			setIsLoad(false);
		}
	};
	return (
		<div
			className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-no-repeat bg-center bg-cover"
			style={{
				backgroundImage: "url('/image/background/background_login.jpg')",
			}}>
			<div className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
				<div className="bg-[#FFFFFF] shadow-xl max-w-3xl w-full p-8 rounded-xl">
					<form
						onSubmit={login}
						className="flex flex-col items-center justify-around gap-5 w-full">
						<div className="flex flex-col justify-center items-center">
							<h2 className="text-2xl font-protest-strike-regular">
								Đăng Nhập
							</h2>
							<p className="opacity-80 font-chakra-petch">
								Xin vui lòng nhập tên đăng nhập và mật khẩu để tiếp tục
							</p>
						</div>

						<div className="flex flex-col gap-5 max-w-xl w-full">
							<label className="form-control w-full max-w-md">
								<div className="label">
									<span className="label-text text-lg font-chakra-petch font-medium">
										Tên đăng nhập
									</span>
								</div>
								<input
									type="text"
									placeholder="example"
									className="input input-bordered w-full max-w-md"
									onChange={(e) =>
										setField((f) => ({ ...f, username: e.target.value }))
									}
								/>
							</label>

							<label className="form-control w-full max-w-md">
								<div className="label">
									<span className="label-text text-lg font-chakra-petch font-medium">
										Mật khẩu
									</span>
									<span className="label-text-alt opacity-80 font-chakra-petch">
										Quên mật khẩu?
									</span>
								</div>
								<input
									type="password"
									placeholder="Mật khẩu"
									className="input input-bordered w-full max-w-md"
									onChange={(e) =>
										setField((f) => ({ ...f, password: e.target.value }))
									}
								/>
								<div className="label">
									<div className="label-text-alt">
										<div className="form-control">
											<label className="label cursor-pointer gap-2">
												<input
													type="checkbox"
													defaultChecked
													className="checkbox"
													onChange={(e) => setRemember(e.target.checked)}
												/>
												<span className="label-text">
													Ghi nhớ phiên đăng nhập
												</span>
											</label>
										</div>
									</div>
								</div>
							</label>
						</div>
						<div className="flex flex-col gap-2 justify-center items-center max-w-md w-full">
							<button
								type="submit"
								className="btn btn-primary max-w-md w-full">
								{isLoad ? (
									<span className="loading loading-dots loading-lg"></span>
								) : (
									'Đăng Nhập'
								)}
							</button>
							<p className="opacity-80 font-chakra-petch">
								Bạn chưa có tài khoản?{' '}
								<a
									className="link underline text-[#5A8CFF] opacity-100"
									href="https://www.nrogame.me/login">
									Tạo Tài Khoản
								</a>
							</p>
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
