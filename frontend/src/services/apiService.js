import axios from 'axios';
import { CacheService } from './cacheService';

export const AxiosClient = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL,
	timeout: 1000,
});

const handleAxiosError = error => {
	if (error.response) {
		return error.response;
	} else if (error.request) {
		console.log('[API ERROR] ', error.request);
	} else {
		console.log('Error', error.message);
	}

	console.log(error.config);
};

export class ApiService {
	static async get(path, params = null, isPrivate = false) {
		return await AxiosClient.get(path, this.getConfig(isPrivate, params))
			.then(response => response.data)
			.catch(handleAxiosError);
	}

	static async post(path, body, isPrivate = false) {
		return await AxiosClient.post(path, body, this.getConfig(isPrivate))
			.then(response => response.data)
			.catch(handleAxiosError);
	}

	static async put(path, body, isPrivate = false) {
		return await AxiosClient.put(path, body, this.getConfig(isPrivate))
			.then(response => response.data)
			.catch(handleAxiosError);
	}

	static getConfig(isPrivate, params = null) {
		const config = {
			headers: { Authorization: '', 'Access-Control-Allow-Origin': '*' },
			params,
		};
		if (isPrivate) {
			const token = CacheService.getJwt();
			config.headers.Authorization = token ? `Bearer ${token}` : '';
		}

		return config;
	}
}
