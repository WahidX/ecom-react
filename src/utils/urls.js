// export const SERVER_ROOT = 'https://codeialx.herokuapp.com';
export const SERVER_ROOT = "http://localhost:8000";
const API_ROOT = `${SERVER_ROOT}/api/v1`;

export const APIurls = {
	fetchProducts: () => `${API_ROOT}/products`,
};
