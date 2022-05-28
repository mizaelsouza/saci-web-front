import axios from "axios";
import { AsyncStorage } from "AsyncStorage";
const Api = axios.create({
    baseURL: "https://saci-web.herokuapp.com/api",
});

Api.interceptors.request.use(async (config) => {
    const tk =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.bx5TJ0NaL9jPGQbk9Hp0IJR0nOk09x_jaLtWza9MlwQ";
    if (tk) {
        config.headers.Authorization = `Bearer ${tk}`;
    }
    return config;
});
export default Api;
