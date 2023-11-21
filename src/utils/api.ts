import axios from "axios";
import nookies from "nookies";

const api = axios.create({
	baseURL: "http://localhost:3030",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
		// Authorization: "Bearer " + token,
	},
});

api.interceptors.request.use(
	async config => {
		const token = nookies.get(null).token;

		if (
			config.url?.includes("/file") &&
			(config.method === "post" || config.method === "put")
		) {
			config.headers["Content-Type"] = "multipart/form-data";
		} else {
			config.headers["Content-Type"] = "application/json";
		}

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	async response => {
		return response;
	},
	async error => {
		const token = nookies.get(null).token;
		const refreshToken = nookies.get(null).refreshToken;

		if (!token && !refreshToken) {
			return Promise.resolve(error);
		}

		if (error.response.status && error.response.status === 401) {
			const res = await api.post("/user/refresh", undefined, {
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			});

			if (res.data.token && res.data.refreshToken) {
				nookies.set(null, "token", res.data.token, {
					path: "/",
					maxAge: 1800,
				});

				nookies.set(null, "refreshToken", res.data.refreshToken, {
					path: "/",
					maxAge: 1800,
				});

				return api.request(error.config);
			}

			return Promise.resolve(error);
		}
	},
);

export default api;
