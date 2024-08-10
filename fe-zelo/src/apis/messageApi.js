import { APPINFOS } from "../constants";
import axiosClient from "./axiosClient";

export const messageApi = {
    handleMessage: async (
        url,
        data,
        method = "GET" || "POST" || "PUT" || "DELETE"
    ) => {
        return await axiosClient(`${APPINFOS.BASE_URL}/messages${url}`, {
            method: method ?? "GET",
            data: data ?? {},
        });
    }
}

export default messageApi;