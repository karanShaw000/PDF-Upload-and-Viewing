
import { SetStateAction } from "react";
import { axiosInstance } from "../axiosConfig";


export async function uploadPdf(data: FormData, setter: React.Dispatch<SetStateAction<number>>) {
    try {
        const res = await axiosInstance({
            url: '/pdf/uploadpdf',
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: data,
            onUploadProgress: data => {
                if (data.total) {
                    setter(Math.round((100 * data.loaded) / data.total))
                }
            }
        })
        return res
    } catch (e) {
        console.error(e)
        throw e
    }

}

