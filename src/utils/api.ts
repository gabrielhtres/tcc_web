import axios from "axios";
import nookies from "nookies";

const token = nookies.get(null).token;
console.log(token);

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

		console.log(config.url);

		if (
			(config.url?.includes("/scale/part") ||
				config.url?.includes("/upload-image")) &&
			(config.method === "post" || config.method === "put")
		) {
			console.log("entrou no if");
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

// api.interceptors.response.use(
// 	async response => {
// 		return response;
// 	},
// 	async error => {
// 		const refreshToken = await getStorageData("refreshToken");

// 		if (error.response.status && error.response.status === 401) {
// 			const res = await api.post("/refresh", undefined, {
// 				headers: {
// 					Authorization: `Bearer ${refreshToken}`,
// 				},
// 			});

// 			return Promise.resolve(error);
// 		}
// 	},
// );

export default api;
