import { APPINFOS } from "../constants";
import axiosClient from "./axiosClient";

export const friendApi = {
    handleFriend: async (
        url,
        data,
        method = "GET" || "POST" || "PUT" || "DELETE"
    ) => {
        return await axiosClient(`${APPINFOS.BASE_URL}/users${url}`, {
            method : method ?? "GET",
            data: data ?? {},
        });
    }
}

export default friendApi;