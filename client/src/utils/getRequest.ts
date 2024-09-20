import { axiosInstance } from "./axiosConfig";
import { fetchParameterType } from "./types";

export const getRequest = async ({ url, responseType = 'json' }: fetchParameterType) => {
    try {
        const res = axiosInstance.get(url, { responseType })

        return res
    } catch (e) {
        throw e
    }


}
