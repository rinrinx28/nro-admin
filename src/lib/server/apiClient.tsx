import axios from 'axios';

const urlConfig = {
	dev: 'http://localhost:3037',
	vps: 'http://144.126.145.81:3037',
	sv: 'https://api.nrogame.me',
};

const apiClient = axios.create({
	baseURL: urlConfig.sv,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default apiClient;
