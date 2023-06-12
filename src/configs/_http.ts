import { config as conf } from "@/configs/env";
import axios from "axios";

const instance = axios.create({
    baseURL: conf.apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export const _http = {
    post: async (url: string, data: any) => {
        const token = localStorage.getItem('token')
        if (token) {
            instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        let req = await instance.post(conf.apiUrl + url, data);
        return req.data;
    },
    fetcher: async (url: any) => {
        const token = localStorage.getItem('token')
        if (token) {
            instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        const req = await instance.get(url).then((res) => {
            return res;
        });
        return req.data
    },
    upload: async (url: any, data: any) => {
        try {
            let req = await instance.post(conf.apiUrl + url, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return req.data;
        } catch (error: any) {
            console.log("Err", error);
        }
    },
};
