import axios from "axios";
const Api = axios.create({
    //baseURL: "http://10.1.5.221:3003/api/",
    //baseURL: "http://10.2.7.101:3003/api/" /*CRISTO REI*/,
    //baseURL: "http://10.4.7.101:3003/api/" /*FLORIANOPOLIS*/,
    //baseURL: "http://10.2.7.101:3004/api/" /*INDUSTRIARIO*/,
    baseURL: "https://saci-web.herokuapp.com/api",
    //baseURL: "http://saciwebnodejs-env.eba-tej3xajn.us-east-1.elasticbeanstalk.com/api/",
});

Api.interceptors.request.use(async (config) => {
    const tk = await localStorage.getItem("@user_token");
    if (tk) {
        config.headers.Authorization = `Bearer ${tk}`;
    }
    return config;
});
export default Api;
