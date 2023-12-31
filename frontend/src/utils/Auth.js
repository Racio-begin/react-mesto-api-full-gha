import { BASE_URL } from "./constants";

function getResponseData(res) {
	if (res.ok) {
		return res.json();
	};
	return Promise.reject(`Ошибка: ${res.status}`);
};

export function register({ email, password }) {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password }),
	})
		.then((res) => getResponseData(res));
};

export function login({ email, password }) {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	})
		.then((res) => getResponseData(res));
};

export function logout() {
	return fetch(`${BASE_URL}/signout`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then((res) => getResponseData(res));
}

export function checkToken(jwt) {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ${jwt}`
		},
	})
		.then((res) => getResponseData(res));
};