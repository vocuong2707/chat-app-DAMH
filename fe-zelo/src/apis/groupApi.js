import { APPINFOS } from "../constants";
import axiosClient from "./axiosClient";

export const groupApi = {
    handleGroups: async (
        url,
        data,
        method = "GET" || "POST" || "PUT" || "DELETE"
    ) => {
        return await axiosClient(`${APPINFOS.BASE_URL}/groups${url}`, {
            method: method ?? "GET",
            data: data ?? {},
        });
    }
}

export default groupApi;