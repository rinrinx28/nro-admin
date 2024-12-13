import axios from 'axios';

const urlConfig = {
	dev: 'http://localhost:3031',
	nro: 'https://api.nrogame.me',
	hsgame: 'https://api.hsgame.me',
};

const apiClient = axios.create({
	baseURL: urlConfig.hsgame,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default apiClient;
