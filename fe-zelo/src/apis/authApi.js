import { APPINFOS } from "../constants";
import axiosClient from "./axiosClient";
export const authApi = {
    handleAuthencation: async (
        url,
        data,
        method = "GET" || "POST" || "PUT" || "DELETE"
    ) => {
        return await axiosClient(`${APPINFOS.BASE_URL}/auth${url}`, {
            method : method ?? "GET",
            data,
        });
    }
}



export default authApi;