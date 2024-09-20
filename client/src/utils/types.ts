import { ResponseType } from "axios"

export type getAllPdf = {
    fileId: string,
    fileName: string,
}

export type getPdf = {
    file: Blob
}

export type fetchParameterType = {
    url: string,
    responseType?: ResponseType
}


export type TApiResponse<T> = {
    header: any;
    status: Number;
    statusText: String;
    data?: T;
    error: any;
    loading: Boolean;
};
