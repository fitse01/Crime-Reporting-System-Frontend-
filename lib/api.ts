import axios from "axios";
import { getOfficerUser } from "./auth";

export const api = axios.create({
    baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
    const user = getOfficerUser();

    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
});
